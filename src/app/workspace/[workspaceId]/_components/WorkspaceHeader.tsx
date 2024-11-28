import { Hint } from '@/components/Hint';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, ListFilter, SquarePen } from 'lucide-react';
import { useState } from 'react';
import { Doc } from '../../../../../convex/_generated/dataModel';
import { InviteModal } from './InviteModal';
import { PreferencesModal } from './PreferencesModal';

interface Props {
    workspace: Doc<'workspaces'>;
    isAdmin: boolean;
}

export const WorkspaceHeader = ({ workspace, isAdmin }: Props) => {
    const [openPreferences, setOpenPreferences] = useState<boolean>(false);
    const [openInvite, setOpenInvite] = useState<boolean>(false);
    return (
        <>
            <InviteModal
                open={openInvite}
                setOpen={setOpenInvite}
                name={workspace.name}
                joinCode={workspace.joinCode}
            />
            <PreferencesModal
                open={openPreferences}
                setOpen={setOpenPreferences}
                initialValue={workspace.name}
            />
            <div className="flex h-[49px] items-center justify-between gap-0.5 px-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="transparent"
                            className="w-auto overflow-hidden p-1.5 text-lg font-semibold"
                            size="sm"
                        >
                            <span className="truncate">{workspace.name}</span>
                            <ChevronDown className="ml-1 size-4 shrink-0" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" side="bottom" className="w-64">
                        <DropdownMenuItem className="cursor-pointer capitalize">
                            <div className="relative mr-2 flex size-9 items-center justify-center overflow-hidden rounded-md bg-[#616061] text-xl font-semibold text-white">
                                {workspace.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex flex-col items-start">
                                <p className="font-bold">{workspace.name}</p>
                                <p className="text-xs text-muted-foreground">
                                    Active Workspace
                                </p>
                            </div>
                        </DropdownMenuItem>
                        {isAdmin && (
                            <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => setOpenInvite(true)}
                                    className="cursor-pointer py-2"
                                >
                                    Invite people to {workspace.name}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => setOpenPreferences(true)}
                                    className="cursor-pointer py-2"
                                >
                                    Preferences
                                </DropdownMenuItem>
                            </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>

                <div className="flex items-center gap-0.5">
                    <Hint label="Filter conversations" side="bottom">
                        <Button variant="transparent" size="iconSm">
                            <ListFilter className="size-4" />
                        </Button>
                    </Hint>

                    <Hint label="New message" side="bottom">
                        <Button variant="transparent" size="iconSm">
                            <SquarePen className="size-4" />
                        </Button>
                    </Hint>
                </div>
            </div>
        </>
    );
};
