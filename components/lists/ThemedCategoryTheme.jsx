import React, { useState } from "react";
import { useColorScheme, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Colors } from "../../constants/Colors";
import UseAppStyles from "../UseAppStyles";
import { MaterialIcons } from "@expo/vector-icons";

export default function ThemedCategoryTheme() {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;
    const styles = UseAppStyles();

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);

    const [items, setItems] = useState([
        { label: "Fixed Cost", value: "fixed_costs" },
        { label: "Investment", value: "investments" },
        { label: "Savings Goal", value: "savings_goals" },
        { label: "Guilt-Free Spending", value: "guilt_free_spending" }
    ]);

    return (
        <View style={{ zIndex: 1000 }}>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="Theme"
                placeholderStyle={{ color: theme.placeholder }}
                style={[styles.textInput, {
                    borderWidth: 0
                }]}
                textStyle={{ color: theme.text }}
                dropDownContainerStyle={{
                    backgroundColor: theme.uiBackground,
                    borderWidth: 0,
                    width: '80%'
                }}
                ArrowDownIconComponent={() => (
                    <MaterialIcons name="keyboard-arrow-down" size={24} color={theme.placeholder} />
                )}
                ArrowUpIconComponent={() => (
                    <MaterialIcons name="keyboard-arrow-up" size={24} color={theme.placeholder} />
                )}
                TickIconComponent={() => (
                    <MaterialIcons name="check" size={20} color={theme.placeholder} />
                )}
            />
        </View>
    );
}
