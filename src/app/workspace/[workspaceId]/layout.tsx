'use client';
import { Sidebar } from './_components/Sidebar';
import { Toolbar } from './_components/Toolbar';

interface Props {
    children: React.ReactNode;
}

const WorkspacesLayout = ({ children }: Props) => {
    return (
        <div className="h-full">
            <Toolbar />
            <div className="flex h-[calc(100vh-40px)]">
                <Sidebar />
                {children}
            </div>
        </div>
    );
};

export default WorkspacesLayout;
