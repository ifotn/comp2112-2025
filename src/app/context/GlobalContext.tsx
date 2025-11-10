'use client';

import { createContext, useContext, ReactNode, useState } from "react";

type CounterContextType = {
    counter: number;
    increment: () => void;
    username: string;
    setUsername: (name: string) => void;
}

// create global var container available throughout the app
export const GlobalContext = createContext<CounterContextType | undefined>(undefined);

// function to update counter and create global DOM element "wrapper" to share with other components
// children: any Child components in React
export function GlobalProvider({ children }: { children: ReactNode }) {
    // inititalize global counter var
    const [counter, setCounter] = useState<number>(0);
    const [username, setUsername] = useState<string>('');

    // function to add 1 when button clicked
    const increment = () => {
        setCounter(counter + 1);
    }

    // expose the global to the DOM 
    return (
        <GlobalContext.Provider value={{ counter, increment, username, setUsername }}>
            {children}
        </GlobalContext.Provider>
    )
}

// expose counter globally
export function useCounter() {
    const context = useContext(GlobalContext);
    if (!context) throw new Error('Counter needs a Provider');
    return context;
}
