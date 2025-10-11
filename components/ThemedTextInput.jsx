import { TextInput, View, useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";
import UseAppStyles from "./UseAppStyles";

export default function ThemedTextInput({ style, ...props }) {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;
    const styles = UseAppStyles();

    return (
        <TextInput 
            placeholderTextColor={ theme.placeholder }
            style={[
                { backgroundColor: theme.uiBackground },
                styles.textInput,
                style
            ]}        
            { ...props }
        />

    )
};