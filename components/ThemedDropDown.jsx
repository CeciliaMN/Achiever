import React, { useState } from "react";
import { useColorScheme, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Colors } from "../constants/Colors";
import UseAppStyles from "./UseAppStyles";
import { MaterialIcons } from "@expo/vector-icons";

export default function ThemedDropDown({ placeholder, items, setItems, value, setValue }) {
    const colorScheme = useColorScheme();
    const colorTheme = Colors[colorScheme] ?? Colors.light;
    const styles = UseAppStyles();

    const [open, setOpen] = useState(false);

    return (
        <View style={{ zIndex: 1000 }}>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder={placeholder}
                placeholderStyle={{ color: colorTheme.placeholder }}
                style={[styles.textInput, {
                    borderWidth: 0
                }]}
                textStyle={{ color: colorTheme.text }}
                dropDownContainerStyle={{
                    backgroundColor: colorTheme.uiBackground,
                    borderWidth: 0,
                    width: '80%'
                }}
                ArrowDownIconComponent={() => (
                    <MaterialIcons name="keyboard-arrow-down" size={24} color={colorTheme.placeholder} />
                )}
                ArrowUpIconComponent={() => (
                    <MaterialIcons name="keyboard-arrow-up" size={24} color={colorTheme.placeholder} />
                )}
                TickIconComponent={() => (
                    <MaterialIcons name="check" size={20} color={colorTheme.placeholder} />
                )}
            />
        </View>
    );
}
