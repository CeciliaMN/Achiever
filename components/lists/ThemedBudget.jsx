import { View, useColorScheme } from "react-native";
import { Colors } from "../../constants/Colors";
import UseAppStyles from "../UseAppStyles";
import ThemedText from "../ThemedText";
import { databases } from "../../lib/appwrite";
import { DATABASE_ID, TABLE_ID } from '../../contexts/CategoriesContext';
import { useState } from "react";
import { useCategories } from '../../hooks/useCategories';
import ThemedCategory from "./ThemedCategory";

export default function ThemedBudget({ style, budget, ...props }) {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;
    const styles = UseAppStyles();
    const { getCategoriesByIds } = useCategories();

    const month = (new Date(budget.month)).toLocaleDateString();
    const monthString = month.substring(0, 7);
    const categoryIds = budget.categoryIds;    
    const { categories } = useCategories();
    const amount = categories.documents.reduce((sum, currentCategory) => {
        return sum + currentCategory.amount;
    }, 0);

    return (
        <View
            style={[
                styles.container,
                style
            ]}
        >
            <View
                style={[
                    styles.itemTransaction
                ]}
            >
                <View style={{
                    flex: 1,
                    alignItems: 'flex-start',
                    paddingStart: '10'
                }}>
                    <ThemedText title={true}>{budget.description}</ThemedText>
                </View>

                <View style={{
                    flex: 1,
                    alignItems: 'flex-end',
                    paddingEnd: '10'
                }}>
                    <ThemedText>{parseFloat(amount).toFixed(2)}$</ThemedText>
                    <ThemedText>{monthString}</ThemedText>
                </View>
            </View>
        </View>

    )
};