import { View, useColorScheme } from "react-native";
import { Colors } from "../../constants/Colors";
import UseAppStyles from "../UseAppStyles";
import ThemedText from "../ThemedText";
import { useCategories } from "../../hooks/useCategories";
import { useEffect, useState } from "react";

export default function ThemedExpense({ style, expense, ...props }) {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;
    const styles = UseAppStyles();

    const date = (new Date(expense.date)).toLocaleDateString();

    return (
        <View
            style={[
                styles.itemExpense,
                style
            ]}
        >
            <View style={{
                flex: 1,
                alignItems: 'flex-start',
                paddingStart: '10'
            }}>
                <ThemedText title={true}>{expense.description}</ThemedText>
            </View>

            <View style={{
                flex: 1,
                alignItems: 'flex-end',
                paddingEnd: '10'
            }}>
                <ThemedText>{parseFloat(expense.amount).toFixed(2)}$</ThemedText>
                <ThemedText>{date}</ThemedText>
            </View>
        </View>
    )
};