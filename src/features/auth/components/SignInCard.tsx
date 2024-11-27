'use client';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useAuthActions } from '@convex-dev/auth/react';
import { SetStateAction, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { SignInFlow } from '../types';

interface Props {
    setState: React.Dispatch<SetStateAction<SignInFlow>>;
}

export const SignInCard = ({ setState }: Props) => {
    const { signIn } = useAuthActions();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [pending, setPending] = useState<boolean>(false);

    const handleProviderSignIn = (value: 'github' | 'google') => {
        setPending(true);
        void signIn(value).finally(() => setPending(false));
    };

    return (
        <Card className="h-full w-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle>Login to continue</CardTitle>
                <CardDescription>
                    Use your email or another service to continue
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 px-0 pb-0">
                <form className="space-y-2.5" action="">
                    <Input
                        disabled={pending}
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        placeholder="hello@email.com"
                        type="email"
                        required
                    />
                    <Input
                        disabled={pending}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        placeholder="password"
                        type="password"
                        required
                    />
                    <Button type="submit" className="w-full" size="lg" disabled={pending}>
                        Continue
                    </Button>
                </form>

                <Separator />
                <div className="flex flex-col gap-y-2.5">
                    <Button
                        disabled={pending}
                        size="lg"
                        className="relative w-full"
                        variant="outline"
                        onClick={() => handleProviderSignIn('google')}
                    >
                        <FcGoogle className="absolute left-2.5 top-1/2 !size-5 -translate-y-1/2" />
                        Continue with Google
                    </Button>
                    <Button
                        disabled={pending}
                        size="lg"
                        className="relative w-full"
                        variant="outline"
                        onClick={() => handleProviderSignIn('github')}
                    >
                        <FaGithub className="absolute left-2.5 top-1/2 !size-5 -translate-y-1/2" />
                        Continue with Github
                    </Button>
                </div>

                <p className="text-xs text-muted-foreground">
                    Don&apos;t have an account?&nbsp;
                    <span
                        onClick={() => setState('signUp')}
                        className="cursor-pointer text-sky-700 hover:underline"
                    >
                        Sign up
                    </span>
                </p>
            </CardContent>
        </Card>
    );
};
