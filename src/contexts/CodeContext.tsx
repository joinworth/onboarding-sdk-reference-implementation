import { createContext } from "react";

export type CodeContextType = {
    getRawCode: (path: string) => string;
    loading: boolean;
};

export const CodeContext = createContext<CodeContextType | undefined>(
    undefined
);