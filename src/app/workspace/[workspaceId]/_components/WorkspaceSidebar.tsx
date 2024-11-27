'use client';

import { useGetchannels } from '@/features/channels/api/use-get-channels';
import { useCurrentMember } from '@/features/members/api/use-current-member';
import { useGetMembers } from '@/features/members/api/use-current-members';
import { useGetWorkspace } from '@/features/workspaces/api/use-get-workspace';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import {
    AlertTriangle,
    HashIcon,
    Loader,
    MessageSquareText,
    SendHorizonal,
} from 'lucide-react';
import { UserItem } from './UserItem';
import { WorkspaceHeader } from './WorkspaceHeader';
import { WorkspaceSection } from './WorkspaceSection';
import { WorkspaceSidebarItem } from './WorkspaceSidebarItem';

export const WorkspaceSidebar = () => {
    const workspaceId = useWorkspaceId();
    const { data: member, isLoading: isMemberLoading } = useCurrentMember({
        workspaceId,
    });
    const { data: members, isLoading: isMembersLoading } = useGetMembers({
        workspaceId,
    });
    const { data: workspace, isLoading: isWorkspaceLoading } = useGetWorkspace({
        id: workspaceId,
    });
    const { data: channels, isLoading: isChannelsLoading } = useGetchannels({
        workspaceId,
    });

    if (isMemberLoading || isWorkspaceLoading) {
        return (
            <div className="flex h-full flex-col items-center justify-center bg-[#5e2c5f]">
                <Loader className="size-5 animate-spin text-white" />
            </div>
        );
    }

    if (!member || !workspace) {
        return (
            <div className="flex h-full flex-col items-center justify-center gap-y-2 bg-[#5e2c5f]">
                <AlertTriangle className="size-5 text-white" />
                <p className="text-sm text-white">Workspace not found</p>
            </div>
        );
    }

    return (
        <div className="flex h-full flex-col bg-[#5e2c5f]">
            <WorkspaceHeader workspace={workspace} isAdmin={member.role === 'admin'} />

            <div className="mt-3 flex flex-col px-2">
                <WorkspaceSidebarItem
                    label="Threads"
                    icon={MessageSquareText}
                    id="threads"
                />
                <WorkspaceSidebarItem
                    label="Drafts & Sent"
                    icon={SendHorizonal}
                    id="drafts"
                />
            </div>

            <WorkspaceSection label="Channels" hint="New channel" onNew={() => {}}>
                {channels?.map((channelItem) => (
                    <WorkspaceSidebarItem
                        key={channelItem._id}
                        label={channelItem.name}
                        icon={HashIcon}
                        id={channelItem._id}
                    />
                ))}
            </WorkspaceSection>

            <WorkspaceSection label="Direct Messages" hint="New message" onNew={() => {}}>
                {members?.map((item) => (
                    <UserItem
                        key={item._id}
                        id={item._id}
                        label={item.user.name}
                        image={item.user.image}
                    />
                ))}
            </WorkspaceSection>
        </div>
    );
};
