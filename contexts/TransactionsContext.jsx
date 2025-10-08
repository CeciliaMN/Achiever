import { createContext, useState } from "react";
import { databases } from "../lib/appwrite";
import { ID, Permission, Role } from "react-native-appwrite";
import { useUser } from "../hooks/useUser";

const DATABASE_ID = '68e59c510035160ea9bf';
const TABLE_ID = 'transactions';

export const TransactionsContext = createContext();

export function TransactionsProvider({ children }) {
    const [transactions, setTransactions] = useState([]);

    const { user } = useUser();
    
    async function getTransactions() {
        try{

        }
        catch(error) {
            console.error(error.message);
        }
    }

    async function getTransactionById(id) {
        try{

        }
        catch(error) {
            console.error(error.message);
        }
    }

    async function addTransaction(data) {
        try{
            const newTransaction = await databases.createDocument(
                DATABASE_ID,
                TABLE_ID,
                ID.unique(),
                {...data, userId: user.$id, },
                [
                    Permission.read(Role.user(user.$id)),
                    Permission.update(Role.user(user.$id)),
                    Permission.delete(Role.user(user.$id))                    
                ]
            )
        }
        catch(error) {
            console.error(error.message);
        }
    }

    async function deleteTransaction(id) {
        try{

        }
        catch(error) {
            console.error(error.message);
        }
    }

    return (
        <TransactionsContext.Provider
            value={{ transactions, getTransactions, getTransactionById, 
                addTransaction, deleteTransaction }}
        >
            {children}
        </TransactionsContext.Provider>
    )

}