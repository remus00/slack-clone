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
import { TriangleAlert } from 'lucide-react';
import { SetStateAction, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { SignInFlow } from '../types';

interface Props {
    setState: React.Dispatch<SetStateAction<SignInFlow>>;
}

export const SignUpCard = ({ setState }: Props) => {
    const { signIn } = useAuthActions();

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [pending, setPending] = useState<boolean>(false);

    const handlePasswordSignUp = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setPending(true);
        signIn('password', { name, email, password, flow: 'signUp' })
            .catch(() => {
                setError('Something went wrong');
            })
            .finally(() => setPending(false));
    };

    const handleProviderSignUp = (value: 'github' | 'google') => {
        setPending(true);
        void signIn(value).finally(() => setPending(false));
    };

    return (
        <Card className="h-full w-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle>Sign up to continue</CardTitle>
                <CardDescription>
                    Use your email or another service to continue
                </CardDescription>
            </CardHeader>
            {!!error && (
                <div className="mb-6 flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                    <TriangleAlert className="size-4" />
                    <p>{error}</p>
                </div>
            )}
            <CardContent className="space-y-5 px-0 pb-0">
                <form className="space-y-2.5" onSubmit={handlePasswordSignUp}>
                    <Input
                        disabled={pending}
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        placeholder="Enter your full name"
                        required
                    />
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
                        placeholder="Password"
                        type="password"
                        required
                    />
                    <Input
                        disabled={pending}
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }}
                        placeholder="Confirm password"
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
                        onClick={() => handleProviderSignUp('google')}
                    >
                        <FcGoogle className="absolute left-2.5 top-1/2 !size-5 -translate-y-1/2" />
                        Continue with Google
                    </Button>
                    <Button
                        disabled={pending}
                        size="lg"
                        className="relative w-full"
                        variant="outline"
                        onClick={() => handleProviderSignUp('github')}
                    >
                        <FaGithub className="absolute left-2.5 top-1/2 !size-5 -translate-y-1/2" />
                        Continue with Github
                    </Button>
                </div>

                <p className="text-xs text-muted-foreground">
                    Already have an account?&nbsp;
                    <span
                        onClick={() => setState('signIn')}
                        className="cursor-pointer text-sky-700 hover:underline"
                    >
                        Sign in
                    </span>
                </p>
            </CardContent>
        </Card>
    );
};
