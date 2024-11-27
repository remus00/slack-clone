import { Button } from '@/components/ui/button';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { IconType } from 'react-icons/lib';

const workspaceSidebarItemVariants = cva(
    'flex h-7 items-center justify-start gap-1.5 px-[18px] font-normal text-sm overflow-hidden',
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
    label: string;
    icon: LucideIcon | IconType;
    id: string;
    variant?: VariantProps<typeof workspaceSidebarItemVariants>['variant'];
}

export const WorkspaceSidebarItem = ({ label, icon: Icon, id, variant }: Props) => {
    const workspaceId = useWorkspaceId();
    return (
        <Button
            variant="transparent"
            size="sm"
            asChild
            className={cn(workspaceSidebarItemVariants({ variant }))}
        >
            <Link href={`/workspace/${workspaceId}/channel/${id}`}>
                <Icon className="mr-1 !size-3.5 shrink-0" />
                <span className="truncate text-sm">{label}</span>
            </Link>
        </Button>
    );
};
