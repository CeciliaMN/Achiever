import { Text, View, Image, useColorScheme } from "react-native";
import { Link } from "expo-router";
import { Colors } from "../constants/Colors";
import UseAppStyles from "./UseAppStyles";

const ThemedView = ({ customStyle, ...props }) => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;
    const styles = UseAppStyles();

    return (
        <View 
            style={[
                { backgroundColor: theme.background },
                styles.container,
                customStyle
            ]}
            { ...props }
        />

    )
};

export default ThemedView;