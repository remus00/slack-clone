import { getAuthUserId } from '@convex-dev/auth/server';
import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

const generateCode = () => {
    const code = Array.from(
        { length: 6 },
        () => '0123456789abcdefghijklmnopqrstuvz'[Math.floor(Math.random() * 36)]
    ).join('');

    return code;
};

export const create = mutation({
    args: {
        name: v.string(),
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) {
            throw new Error('Unauthorized');
        }

        /* TODO: dynamic */
        const joinCode = generateCode();

        const workspaceId = await ctx.db.insert('workspaces', {
            name: args.name,
            userId,
            joinCode,
        });

        await ctx.db.insert('members', {
            userId,
            workspaceId,
            role: 'admin',
        });

        return workspaceId;
    },
});

export const get = query({
    args: {},
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) {
            return [];
        }

        const members = await ctx.db
            .query('members')
            .withIndex('by_user_id', (qry) => qry.eq('userId', userId))
            .collect();

        const worspaceIds = members.map((member) => member.workspaceId);

        const workspaces = [];

        for (const workspaceId of worspaceIds) {
            const workspace = await ctx.db.get(workspaceId);
            if (workspace) {
                workspaces.push(workspace);
            }
        }

        return workspaces;
    },
});

export const getById = query({
    args: { id: v.id('workspaces') },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);

        if (!userId) {
            throw new Error('Unauthorized');
        }

        const member = await await ctx.db
            .query('members')
            .withIndex('by_workspace_id_user_id', (qry) =>
                qry.eq('workspaceId', args.id).eq('userId', userId)
            )
            .unique();

        if (!member) return null;

        return await ctx.db.get(args.id);
    },
});
