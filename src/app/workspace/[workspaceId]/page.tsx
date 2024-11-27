'use client';
import { useWorkspaceId } from '@/hooks/use-workspace-id';

const SingleWorkspacePage = () => {
    const workspaceId = useWorkspaceId();

    return (
        <div className="flex flex-col gap-5">
            <p>Id: {workspaceId}</p>
        </div>
    );
};

export default SingleWorkspacePage;
