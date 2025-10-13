import { createContext, useEffect, useState, useTransition } from "react";
import { databases } from "../lib/appwrite";
import { ID, Permission, Query, Role } from "react-native-appwrite";
import { useUser } from "../hooks/useUser";

const DATABASE_ID = '68e691f7002d4c5bd0a7';
const TABLE_ID = 'budgets';

export const BudgetsContext = createContext();

export function BudgetsProvider({ children }) {
    const [budgets, setBudgets] = useState([]);

    const { user } = useUser();

    async function getBudgets() {
        try {
            const budgets = await databases.listDocuments(
                DATABASE_ID,
                TABLE_ID,
                [
                    Query.equal('userId', user.id)
                ]
            );

            setBudgets(budgets);
        }
        catch (error) {
            console.error(error.message);
        }
    }

    async function getBudgetById(id) {
        try {
            const budget = await databases.getDocument(
                DATABASE_ID,
                TABLE_ID,
                id
            );

            return budget;
        }
        catch (error) {
            console.error(error.message);
        }
    }

    async function addBudget(data) {
        try {
            console.log(data);
            const month = data.date;
            const description = data.description;
            const categoryIds = data.budgetCategoryIds;

            //const existingBudgets = getBudgets();


            const newbudget = await databases.createDocument(
                DATABASE_ID,
                TABLE_ID,
                ID.unique(),
                {
                    userId: user.$id,
                    month: month,
                    description: description,
                    categoryIds: categoryIds
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

    async function deleteBudget(id) {
        try {
            const budget = await databases.deleteDocument(
                DATABASE_ID,
                TABLE_ID,
                id
            );

            return budget;
        }
        catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        if (user) {
            getBudgets();
        }
        else {
            setBudgets([]);
        }
    }, [user, budgets])

    return (
        <BudgetsContext.Provider
            value={{
                budgets, getBudgets, getBudgetById,
                addBudget, deleteBudget
            }}
        >
            {children}
        </BudgetsContext.Provider>
    )
}