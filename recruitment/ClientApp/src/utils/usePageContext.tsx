import React, {createContext, FC, ReactNode, useContext, useEffect, useState} from 'react';

interface PageContextType {
    title: string;
    setTitle: (value: string) => void
}

const PageContext = createContext<PageContextType>({
    title: '',
    setTitle: (value) => document.title = value
});

interface ContextProps {
    children: ReactNode;
}

export const PageContextProvider: FC<ContextProps> = ({ children }) => {
    const [title, setTitle] = useState('');

    useEffect(() => { document.title = title }, [title]);

    return (
        <PageContext.Provider
            value={{ title, setTitle }}
        >
            {children}
        </PageContext.Provider>
    );
};

export const usePageContext = () => useContext(PageContext);