import { createContext, useEffect, useState, useTransition } from "react";
import { databases } from "../lib/appwrite";
import { ID, Permission, Query, Role } from "react-native-appwrite";
import { useUser } from "../hooks/useUser";

const DATABASE_ID = '68e691f7002d4c5bd0a7';
const TABLE_ID = 'categories';

export const CategoriesContext = createContext();

export function CategoriesProvider({ children }) {
    const [categories, setCategories] = useState([]);

    const { user } = useUser();

    async function getCategories() {
        try {
            const categories = await databases.listDocuments(
                DATABASE_ID,
                TABLE_ID,
                [
                    Query.equal('userId', user.$id)
                ]
            );

            setCategories(categories);
        }
        catch (error) {
            console.error(error.message);
        }
    }

    async function getCategoryById(id) {
        try {
            const category = await databases.getDocument(
                DATABASE_ID,
                TABLE_ID,
                id
            );

            console.log('Get category by ID: ', category);
            return category;
        }
        catch (error) {
            console.error(error.message);
        }
    }

    async function getCategoriesByIds(categoryIds) {
        if (!categoryIds || categoryIds.length === 0) return [];

        let categories = [];

        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                TABLE_ID,
                [
                    Query.equal("$id", categoryIds) // 👈 filtre sur les IDs contenus dans ta liste
                ]
            );

            categories = response.documents; // 👈 liste complète des objets correspondants
        } catch (error) {
            console.error("Erreur lors de la récupération des catégories :", error);
        }

        return categories;
    }

    async function addCategory(data) {
        try {
            console.log(data);
            const date = data.date;
            const description = data.description;
            const theme = data.categoryTheme;
            const amount = parseFloat(data.amount);

            const newCategory = await databases.createDocument(
                DATABASE_ID,
                TABLE_ID,
                ID.unique(),
                {
                    userId: user.$id,
                    date: date,
                    description: description,
                    theme: theme,
                    amount: amount
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

    async function deleteCategory(id) {
        try {
            const category = await databases.deleteDocument(
                DATABASE_ID,
                TABLE_ID,
                id
            );

            return category;
        }
        catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        if (user) {
            getCategories();
        }
        else {
            setCategories([]);
        }
    }, [user, categories])

    return (
        <CategoriesContext.Provider
            value={{
                categories, getCategories, getCategoryById,
                getCategoriesByIds, addCategory, deleteCategory
            }}
        >
            {children}
        </CategoriesContext.Provider>
    )
}