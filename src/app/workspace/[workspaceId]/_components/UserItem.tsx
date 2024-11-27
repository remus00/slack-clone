'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import { Id } from '../../../../../convex/_generated/dataModel';

const userItemVariants = cva(
    'flex h-7 items-center justify-start gap-1.5 px-4 font-normal text-sm overflow-hidden',
    {
        variants: {
            variant: {
                default: 'text-[#f9edffcc]',
                active: 'text-[#481349] bg-white/90 hover:bg-white/90',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

interface Props {
    id: Id<'members'>;
    label?: string;
    image?: string;
    variant?: VariantProps<typeof userItemVariants>['variant'];
}

export const UserItem = ({ id, label = 'Member', image, variant }: Props) => {
    const workspaceId = useWorkspaceId();

    const avatarFallBack = label!.charAt(0).toUpperCase();

    return (
        <Button
            variant="transparent"
            className={cn(userItemVariants({ variant }))}
            asChild
            size="sm"
        >
            <Link href={`/workspace/${workspaceId}/member/${id}`}>
                <Avatar className="mr-1 size-5 rounded-md">
                    <AvatarImage className="rounded-md" src={image} />
                    <AvatarFallback className="rounded-md bg-sky-500">
                        {avatarFallBack}
                    </AvatarFallback>
                </Avatar>
                <span className="truncate text-sm">{label}</span>
            </Link>
        </Button>
    );
};
