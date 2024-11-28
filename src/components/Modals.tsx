'use client';

import { CreateChannelModal } from '@/features/channels/components/CreateChannelModal';
import { CreateWorkspaceModal } from '@/features/workspaces/components/CreateWorkspaceModal';
import { useEffect, useState } from 'react';

export const Modals = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <CreateWorkspaceModal />
            <CreateChannelModal />
        </>
    );
};
