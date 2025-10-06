import { View, useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";
import UseAppStyles from "./UseAppStyles";
import { Link } from "expo-router";

export default function ThemedLink({ style, href, ...props }) {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;
    const styles = UseAppStyles();

    return (
        <Link 
            style={[
                styles.link,
                style
            ]}
            href={ href }
            { ...props }
        />

    )
};