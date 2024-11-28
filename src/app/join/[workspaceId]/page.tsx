'use client';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useGetWorkspaceInfo } from '@/features/workspaces/api/use-get-workspace-info';
import { useJoin } from '@/features/workspaces/api/use-join';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { cn } from '@/lib/utils';
import { LoaderIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { HiHashtag } from 'react-icons/hi';
import { toast } from 'sonner';

const JoinPage = () => {
    const workspaceId = useWorkspaceId();
    const [value, setValue] = useState<string>('');
    const { mutate, isPending } = useJoin();
    const { data, isLoading } = useGetWorkspaceInfo({ id: workspaceId });
    const router = useRouter();
    const isMember = useMemo(() => data?.isMember, [data?.isMember]);

    useEffect(() => {
        if (isMember) {
            router.push(`/workspace/${workspaceId}`);
        }
    }, [isMember, router, workspaceId]);

    const handleComplete = (value: string) => {
        mutate(
            { workspaceId, joinCode: value },
            {
                onSuccess: (id) => {
                    toast.success('Workspace joined successfully.');
                    router.replace(`/workspace/${id}`);
                },
                onError: () => {
                    toast.error('Failed to join the workspace');
                },
            }
        );
    };

    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <LoaderIcon className="!size-6 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="flex h-full flex-col items-center justify-center gap-y-8 rounded-lg bg-white p-8 shadow-md">
            <HiHashtag className="!size-[60px] text-rose-500" />
            <div className="flex max-w-md flex-col items-center justify-center gap-y-4">
                <div className="flex flex-col items-center justify-center gap-y-2">
                    <h1 className="text-2xl font-bold">Join {data?.name}</h1>
                    <p className="text-lg text-muted-foreground">
                        Enter the workspace code to join
                    </p>
                </div>

                <InputOTP
                    maxLength={6}
                    value={value}
                    onChange={setValue}
                    onComplete={handleComplete}
                >
                    <InputOTPGroup
                        className={cn(
                            'shad-otp uppercase',
                            isPending && 'cursor-not-allowed opacity-50'
                        )}
                    >
                        <InputOTPSlot index={0} className="shad-otp-slot" />
                        <InputOTPSlot index={1} className="shad-otp-slot" />
                        <InputOTPSlot index={2} className="shad-otp-slot" />
                        <InputOTPSlot index={3} className="shad-otp-slot" />
                        <InputOTPSlot index={4} className="shad-otp-slot" />
                        <InputOTPSlot index={5} className="shad-otp-slot" />
                    </InputOTPGroup>
                </InputOTP>
            </div>

            <div className="flex gap-x-4">
                <Button size="lg" variant="outline" asChild>
                    <Link href="/">Back to the homepage</Link>
                </Button>
            </div>
        </div>
    );
};

export default JoinPage;
