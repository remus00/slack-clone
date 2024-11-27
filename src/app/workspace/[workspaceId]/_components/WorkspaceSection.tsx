import { Hint } from '@/components/Hint';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PlusIcon } from 'lucide-react';
import { FaCaretDown } from 'react-icons/fa';
import { useToggle } from 'react-use';

interface Props {
    children: React.ReactNode;
    label: string;
    hint: string;
    onNew?: () => void;
}

export const WorkspaceSection = ({ children, label, hint, onNew }: Props) => {
    const [on, toggle] = useToggle(true);

    return (
        <section className="mt-3 flex flex-col px-2">
            <div className="group flex items-center px-3.5">
                <Button
                    variant="transparent"
                    className="size-6 shrink-0 p-0.5 text-sm text-[#f9edffcc]"
                    onClick={toggle}
                >
                    <FaCaretDown
                        className={cn(
                            '!size-4 transition-transform',
                            on && '-rotate-90 transform'
                        )}
                    />
                </Button>
                <Button
                    variant="transparent"
                    size="sm"
                    className="group h-[28px] items-center justify-start overflow-hidden px-1.5 text-sm text-[#f9edffcc]"
                >
                    <span className="truncate">{label}</span>
                </Button>
                {onNew && (
                    <Hint label={hint} side="top" align="center">
                        <Button
                            onClick={onNew}
                            variant="transparent"
                            size="iconSm"
                            className="ml-auto size-6 shrink-0 p-0.5 text-sm text-[#f9edffcc] opacity-0 transition-all group-hover:opacity-100"
                        >
                            <PlusIcon className="!size-4" />
                        </Button>
                    </Hint>
                )}
            </div>
            {on && children}
        </section>
    );
};
