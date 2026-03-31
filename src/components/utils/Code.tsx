import { useCodeContext } from '@/hooks/useCodeContext';
import React, { useEffect, useState } from 'react';
import SyntaxHighlighter, {
    type SyntaxHighlighterProps,
} from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import './Code.css'

export type CodeProps = {
    language?: string;
    mapReplace?: { [matchText: string]: string };
    syntaxHighlighterProps?: SyntaxHighlighterProps;
} & ({ type: 'content'; code: string }
    | { type: 'path'; codePath: string });

export const Code: React.FC<CodeProps> = ({
    language,
    mapReplace,
    syntaxHighlighterProps,
    ...rest
}) => {
    const codeContext = useCodeContext();
    const [code, setCode] = useState('');
    const initialized =
        codeContext?.loading === false || codeContext === undefined;

    const formatCode = (code: string = '') => {
        if (mapReplace) {
            Object.keys(mapReplace).forEach((matchText) => {
                const newValue = mapReplace![matchText];
                code = code.replace(new RegExp(`${matchText}`, 'ig'), newValue);
            });
        }

        if (code.match('//@ts-nocheck')) {
            code = code.replace('//@ts-nocheck', '');
            return code.substring(code.indexOf('\n') + 1);
        } else {
            return code;
        }
    };

    useEffect(() => {
        if (initialized) {
            let content = '';
            if (rest.type === 'path') {
                content = codeContext?.getRawCode(rest.codePath) || '';
            } else if (rest.type === 'content') {
                content = rest.code;
            }

            const code = formatCode(content);
            if (code) setCode(code);
        }
    }, [initialized, (rest as any)?.codePath, (rest as any)?.code]);

    return (
        <div className='code-snippet'>
            <SyntaxHighlighter
                language={language}
                style={atomOneDark}
                children={code}
                {...syntaxHighlighterProps}
            />
        </div>
    );
};