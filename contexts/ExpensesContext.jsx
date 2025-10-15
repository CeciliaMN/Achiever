import { createContext, useEffect, useState, useTransition } from "react";
import { databases } from "../lib/appwrite";
import { ID, Permission, Query, Role } from "react-native-appwrite";
import { useUser } from "../hooks/useUser";
import { supabase } from "../lib/supabase";

const DATABASE_ID = '68e691f7002d4c5bd0a7';
const TABLE_ID = 'expenses';

export const ExpensesContext = createContext();

export function ExpensesProvider({ children }) {
    const [expenses, setExpenses] = useState([]);

    const { user } = useUser();

    async function getExpenses() {
        try {
            const { data } = supabase
                .from(TABLE_ID)
                .select();

            setExpenses(data);

        }
        catch (error) {
            console.error(error.message);
        }
    }

    async function getExpenseById(id) {
        try {
            const { data } = supabase
                .from(TABLE_ID)
                .select('*')
                .ep('id', id)
                .single();

            return data;
        }
        catch (error) {
            console.error(error.message);
        }

    }

    async function addExpense({ date, amount, description, categoryId }) {
        try {
            const { error } = await supabase
                .from(TABLE_ID)
                .insert({
                    date: date,
                    amount: amount,
                    description: description,
                    categoryId: categoryId
                });
        }
        catch (error) {
            console.error(error.message);
        }
    }

    async function updateExpense(id, { date, amount, description, categoryId }) {
        try {
            const { error } = await supabase
                .from(TABLE_ID)
                .update({
                    date: date,
                    amount: amount,
                    description: description,
                    categoryId: categoryId
                })
                .eq({ 'id': id });
        }
        catch (error) {
            console.error(error.message);
        }
    }

    async function deleteExpense(id) {
        try {
            const response = await supabase
                .from(TABLE_ID)
                .delete()
                .eq('id', id)
        }
        catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        if (user) {
            getExpenses();
        }
        else {
            setExpenses([]);
        }
    }, [user, expenses])

    return (
        <ExpensesContext.Provider
            value={{
                expenses, getExpenses, getExpenseById,
                addExpense, updateExpense, deleteExpense
            }}
        >
            {children}
        </ExpensesContext.Provider>
    )
}