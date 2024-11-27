'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthActions } from '@convex-dev/auth/react';
import { Loader, LogOut } from 'lucide-react';
import { useCurrentUser } from '../api/use-current-user';

export const UserButton = () => {
    const { signOut } = useAuthActions();
    const { data, isLoading } = useCurrentUser();

    if (isLoading) {
        return <Loader className="size-4 animate-spin text-muted-foreground" />;
    }

    if (!data) {
        return null;
    }

    const { image, name } = data;

    const avatarFallBack = name!.charAt(0).toUpperCase();

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="relative outline-none">
                <Avatar className="size-10 transition hover:opacity-75">
                    <AvatarImage alt="name" src={image} />
                    <AvatarFallback className="bg-sky-500">
                        {avatarFallBack}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" side="right" className="w-60">
                <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
                    <LogOut className="mr-2 size-4" />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};