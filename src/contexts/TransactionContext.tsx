import { createContext, ReactNode, useEffect, useState } from "react";

interface Transaction {
    id: number;
    category: string;
    price: number;
    description: string;
    type: 'income' | 'outcome';
    createdAt: string;
}

interface TransactionContextProps {
    transactions: Transaction[]
}

interface TransactionProviderProps {
    children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextProps)

export function TransactionProvider({ children }: TransactionProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    async function loadTransactions() {
        const response = await fetch('http://localhost:3333/transactions')
        const data = response ? await response.json() : []

        setTransactions(data)
    }

    useEffect(() => {
        loadTransactions()
    }, [])


    return (
        <TransactionsContext.Provider
            value={{ transactions }}
        >
            {children}
        </TransactionsContext.Provider>
    )
}