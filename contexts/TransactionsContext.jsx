import { createContext, useEffect, useState, useTransition } from "react";
import { databases } from "../lib/appwrite";
import { ID, Permission, Query, Role } from "react-native-appwrite";
import { useUser } from "../hooks/useUser";

const DATABASE_ID = '68e691f7002d4c5bd0a7';
const TABLE_ID = 'transactions';

export const TransactionsContext = createContext();

export function TransactionsProvider({ children }) {
    const [transactions, setTransactions] = useState([]);

    const { user } = useUser();

    async function getTransactions() {
        try {
            const transactions = await databases.listDocuments(
                DATABASE_ID,
                TABLE_ID,
                [
                    Query.equal('userId', user.$id)
                ]
            );

            setTransactions(transactions);
            console.log('Transactions fetched: ', transactions);
        }
        catch (error) {
            console.error(error.message);
        }
    }

    async function getTransactionById(id) {
        try {

        }
        catch (error) {
            console.error(error.message);
        }
    }

    async function addTransaction(data) {
        try {
            console.log(data);
            const date = data.date;
            const amount = parseFloat(data.amount);
            const description = data.description;
            const category = data.category;

            const newTransaction = await databases.createDocument(
                DATABASE_ID,
                TABLE_ID,
                ID.unique(),
                {
                    userId: user.$id,
                    date: date,
                    amount: amount,
                    description: description,
                    category: category
                },
                [
                    Permission.read(Role.user(user.$id)),
                    Permission.update(Role.user(user.$id)),
                    Permission.delete(Role.user(user.$id))
                ]
            )
        }
        catch (error) {
            console.error(error.message);
        }
    }

    async function deleteTransaction(id) {
        try {

        }
        catch (error) {
            console.error(error.message);
        }
    }
    
    useEffect(() => {
        if(user) {
            getTransactions();
        }
        else {
            setTransactions([]);
        }
    }, [user])

    return (
        <TransactionsContext.Provider
            value={{
                transactions, getTransactions, getTransactionById,
                addTransaction, deleteTransaction
            }}
        >
            {children}
        </TransactionsContext.Provider>
    )

}