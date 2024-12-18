import { ConvexClientProvider } from '@/components/ConvexClientProvider';
import { JotaiProvider } from '@/components/JotaiProvider';
import { Modals } from '@/components/Modals';
import { Toaster } from '@/components/ui/sonner';
import { ConvexAuthNextjsServerProvider } from '@convex-dev/auth/nextjs/server';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ConvexAuthNextjsServerProvider>
            <html lang="en">
                <body className={`${inter.className} antialiased`}>
                    <ConvexClientProvider>
                        <Toaster />
                        <JotaiProvider>
                            <Modals />
                            {children}
                        </JotaiProvider>
                    </ConvexClientProvider>
                </body>
            </html>
        </ConvexAuthNextjsServerProvider>
    );
}
