import type { PropsWithChildren, ReactElement } from 'react';

interface DemoShellProps {
    title: string;
    description: string;
}

const DemoShell = ({
    title,
    description,
    children,
}: PropsWithChildren<DemoShellProps>): ReactElement => (
    <div className="min-h-fit sm:py-12 sm:px-6">
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-4xl font-serif text-white mb-2">
                    {title}
                </h1>
                <p className="text-white/70">{description}</p>
            </div>
            {children}
        </div>
    </div>
);

export default DemoShell;
