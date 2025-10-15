import { Pressable, View, useColorScheme } from "react-native";
import { Colors } from "../../constants/Colors";
import UseAppStyles from "../UseAppStyles";
import ThemedText from "../ThemedText";
import { useState } from "react";

export default function ThemedCategory({ style, category, categories, budgetCategoryIds, setBudgetCategoryIds, ...props }) {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;
    const styles = UseAppStyles();

    const [selected, setSelected] = useState(false);
    const [color, setColor] = useState(Colors.primary)

    function handleSelectionChange() {
        const newSelection = !selected;
        const newColor = newSelection ? theme.text : Colors.primary;
        setSelected(newSelection);
        setColor(newColor);


        const currentId = category.id;

        let newIds = budgetCategoryIds;

        if (newSelection && !budgetCategoryIds.includes(currentId)) {
            newIds.push(currentId);
        }
        else if (!newSelection && budgetCategoryIds.includes(currentId)) {
            newIds = budgetCategoryIds.filter((id) => id !== currentId);
        }

        setBudgetCategoryIds(newIds);
        console.log('Updated list of budget category IDs : ', newIds);
    }



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
                <ThemedText title={true}>{category.description}</ThemedText>
                <ThemedText style={{ fontStyle: 'italic' }}>{category.theme}</ThemedText>
            </View>

            <View style={{
                flex: 1,
                alignItems: 'flex-end',
                paddingEnd: '10'
            }}>
                <ThemedText>{parseFloat(category.amount).toFixed(2)}$</ThemedText>

                <Pressable onPress={handleSelectionChange} >
                    <ThemedText style={{ color: color }}>{selected ? 'added' : 'add'}</ThemedText>
                </Pressable>
            </View>
        </View>

    )
};