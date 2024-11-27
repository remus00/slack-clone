'use client';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '@/components/ui/resizable';
import { Sidebar } from './_components/Sidebar';
import { Toolbar } from './_components/Toolbar';
import { WorkspaceSidebar } from './_components/WorkspaceSidebar';

interface Props {
    children: React.ReactNode;
}

const WorkspacesLayout = ({ children }: Props) => {
    return (
        <div className="h-full">
            <Toolbar />
            <div className="flex h-[calc(100vh-40px)]">
                <Sidebar />
                <ResizablePanelGroup
                    direction="horizontal"
                    autoSaveId="sc-workspace-layout"
                >
                    <ResizablePanel
                        defaultSize={20}
                        minSize={11}
                        className="bg-[#5e2c5f]"
                    >
                        <WorkspaceSidebar />
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel minSize={20}>{children}</ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </div>
    );
};

export default WorkspacesLayout;
