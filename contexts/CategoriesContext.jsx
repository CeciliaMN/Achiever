import { createContext, useEffect, useState, useTransition } from "react";
import { databases } from "../lib/appwrite";
import { ID, Permission, Query, Role } from "react-native-appwrite";
import { useUser } from "../hooks/useUser";
import { supabase } from "../lib/supabase";

const TABLE_ID = 'categories';

export const CategoriesContext = createContext();

export function CategoriesProvider({ children }) {
    const [categories, setCategories] = useState([]);

    const { user } = useUser();

    async function getCategories() {

        try {
            const { data } = supabase
                .from(TABLE_ID)
                .select();

            setCategories(data);
        }
        catch (error) {
            console.error(error.message);
        }
    }

    async function getCategoryById(id) {
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

    async function getCategoriesByIds(categoryGroups) {
        if (!categoryGroups || categoryGroups.length === 0) return [];

        let categories = [];

        try {
            const { data } = supabase
                .from(TABLE_ID)
                .select('*')
                .ep('id', categoryGroups)
                .single();

            categories = data; // 👈 liste complète des objets correspondants
        } catch (error) {
            console.error("Erreur lors de la récupération des catégories :", error);
        }

        return categories;
    }

    async function addCategory(userId, { description, categoryGroup, amount }) {
        try {
            console.log('userId : ', userId);
            console.log('Description : ', description);
            console.log('Group : ', categoryGroup);
            console.log('Amount : ', amount);

            const { data, error } = await supabase
                .from(TABLE_ID)
                .insert({
                    user_id: userId,
                    description: description,
                    category_group: categoryGroup,
                    amount: amount
                });

            if (error) {
                console.error('Insert error:', error.message);
            } else {
                console.log('Added successfully:', data);
            }
        }
        catch (error) {
            console.error(error.message);
        }
    }

    async function updateCategory(id, { description, categoryGroup, amount }) {
        try {
            const { error } = await supabase
                .from(TABLE_ID)
                .update({
                    description: description,
                    category_group: categoryGroup,
                    amount: amount
                })
                .eq({ 'id': id });
        }
        catch (error) {
            console.error(error.message);
        }
    }

    async function deleteCategory(id) {
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