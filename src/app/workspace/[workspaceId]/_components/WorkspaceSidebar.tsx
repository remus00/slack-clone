'use client';

import { useCurrentMember } from '@/features/members/api/use-current-member';
import { useGetWorkspace } from '@/features/workspaces/api/use-get-workspace';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { AlertTriangle, Loader } from 'lucide-react';
import { WorkspaceHeader } from './WorkspaceHeader';

export const WorkspaceSidebar = () => {
    const workspaceId = useWorkspaceId();
    const { data: member, isLoading: isMemberLoading } = useCurrentMember({
        workspaceId,
    });
    const { data: workspace, isLoading: isWorkspaceLoading } = useGetWorkspace({
        id: workspaceId,
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
        </div>
    );
};
