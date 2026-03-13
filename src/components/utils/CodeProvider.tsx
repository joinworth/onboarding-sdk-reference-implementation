import { CodeContext } from '@/contexts/CodeContext';
import React, { useEffect, useState } from 'react';

export interface CodeProviderProps {
    children?: React.ReactElement;
    loadCodeSnippets: () => Promise<{ [key: string]: string }>;
}

export const CodeProvider: React.FC<CodeProviderProps> = ({
    children,
    loadCodeSnippets,
}) => {
    const [loading, setLoading] = useState(true);
    const [snippets, setSnippets] = useState<{ [key: string]: string }>({});

    const getRawCode = (path: string): string => {
        path = path.replace(/^\//, '');

        for (const key in snippets) {
            if (key.match(`/${path}`)) {
                return snippets[key];
            }
        }

        return '';
    };

    const init = async () => {
        setSnippets(await loadCodeSnippets());
        setLoading(false);
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <CodeContext.Provider value={{ loading, getRawCode }}>
            {children}
        </CodeContext.Provider>
    );
};