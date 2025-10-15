import { useContext } from "react";
import { ExpensesContext } from "../contexts/ExpensesContext";

export function useExpenses() {
    const context = useContext(ExpensesContext);

    if (!context) {
        throw new Error('useExpenses must be used within a ExpensesProvider.');
    }

    return context;
}