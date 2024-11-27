'use client';
import { UserButton } from '@/features/auth/components/UserButton';
import { Bell, Home, MessagesSquare, MoreHorizontal } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { SidebarButton } from './SidebarButton';
import { WorkspaceSwitcher } from './WorkspaceSwitcher';

export const Sidebar = () => {
    const path = usePathname();

    return (
        <aside className="flex h-full w-[70px] flex-col items-center gap-y-4 bg-[#481349] py-[9px]">
            <WorkspaceSwitcher />
            <SidebarButton
                icon={Home}
                label="Home"
                isActive={path.includes('/workspace')}
            />
            <SidebarButton icon={MessagesSquare} label="DMs" />
            <SidebarButton icon={Bell} label="Activity" />
            <SidebarButton icon={MoreHorizontal} label="More" />
            <div className="mt-auto flex flex-col items-center justify-center gap-y-1">
                <UserButton />
            </div>
        </aside>
    );
};
