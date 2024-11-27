'use client';
import { UserButton } from '@/features/auth/components/UserButton';
import { useGetWorkspaces } from '@/features/workspaces/api/use-get-workspaces';
import { useCreateWorkspaceModal } from '@/features/workspaces/store/use-create-workspace-modal';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';

export default function Home() {
    const router = useRouter();
    const { data, isLoading } = useGetWorkspaces();
    const [open, setOpen] = useCreateWorkspaceModal();

    const workSpaceId = useMemo(() => data?.[0]?._id, [data]);

    useEffect(() => {
        if (isLoading) return;
        if (workSpaceId) {
            router.replace(`/workspace/${workSpaceId}`);
        } else if (!open) {
            setOpen(true);
            console.log('Open creation modal');
        }
    }, [workSpaceId, isLoading, open, setOpen, router]);

    return (
        <div>
            <UserButton />
        </div>
    );
}
