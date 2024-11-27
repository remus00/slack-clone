import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useRemoveWorkspace } from '@/features/workspaces/api/use-remove-workspace';
import { useUpdateWorkspace } from '@/features/workspaces/api/use-update-workspace';
import { useConfirm } from '@/hooks/use-confirm';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SetStateAction, useState } from 'react';
import { toast } from 'sonner';

interface Props {
    open: boolean;
    setOpen: React.Dispatch<SetStateAction<boolean>>;
    initialValue: string;
}

export const PreferencesModal = ({ open, setOpen, initialValue }: Props) => {
    const workspaceId = useWorkspaceId();
    const router = useRouter();

    const [ConfirmDialog, confirm] = useConfirm(
        'Are you sure?',
        'This action is irreversible!'
    );

    const [value, setValue] = useState<string>(initialValue);
    const [openEdit, setOpenEdit] = useState<boolean>(false);

    const { mutate: updateWorkspace, isPending: isUpdatingWorkspace } =
        useUpdateWorkspace();
    const { mutate: removeWorkspace, isPending: isRemovingWorkspace } =
        useRemoveWorkspace();

    const handleRemove = async () => {
        const ok = await confirm();
        if (!ok) return;

        removeWorkspace(
            { id: workspaceId },
            {
                onSuccess: () => {
                    toast.success(`Workspace ${value} removed successfully`);
                    router.replace('/');
                },
                onError: () => {
                    toast.error('Failed to remove Workspace');
                },
            }
        );
    };

    const handleEdit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        updateWorkspace(
            {
                id: workspaceId,
                name: value,
            },
            {
                onSuccess: () => {
                    toast.success('Workspace name updated');
                    setOpenEdit(false);
                },
                onError: () => {
                    toast.error('Failed to update Workspace name');
                },
            }
        );
    };

    return (
        <>
            <ConfirmDialog />

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="overflow-hidden bg-gray-50/90 p-0">
                    <DialogHeader className="border-b bg-white p-4">
                        <DialogTitle>{value}</DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col gap-y-2 px-4 pb-4">
                        <Dialog open={openEdit} onOpenChange={setOpenEdit}>
                            <DialogTrigger asChild>
                                <div className="cursor-pointer rounded-lg border bg-white px-5 py-4 transition-all hover:bg-gray-50">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-semibold">
                                            Workspace name
                                        </p>
                                        <p className="text-sm font-medium text-[#1264a3] hover:underline">
                                            Edit
                                        </p>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {value}
                                    </p>
                                </div>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Rename this workspace</DialogTitle>
                                </DialogHeader>
                                <form className="space-y-4" onSubmit={handleEdit}>
                                    <Input
                                        value={value}
                                        disabled={isUpdatingWorkspace}
                                        onChange={(e) => setValue(e.target.value)}
                                        required
                                        autoFocus
                                        minLength={3}
                                        maxLength={80}
                                        placeholder="Workspace name"
                                    />
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button
                                                variant="outline"
                                                disabled={isUpdatingWorkspace}
                                            >
                                                Cancel
                                            </Button>
                                        </DialogClose>
                                        <Button disabled={isUpdatingWorkspace}>
                                            Save
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                        <button
                            autoFocus={false}
                            disabled={isRemovingWorkspace}
                            onClick={handleRemove}
                            className="flex cursor-pointer items-center justify-center gap-x-2 rounded-lg border bg-white px-5 py-4 text-rose-600 transition-all hover:border-rose-300 hover:bg-rose-200"
                        >
                            <TrashIcon className="size-4" />
                            <p className="text-sm font-semibold">Delete workspace</p>
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};
