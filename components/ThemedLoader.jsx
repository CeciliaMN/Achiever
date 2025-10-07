import { ActivityIndicator, View, useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";
import UseAppStyles from "./UseAppStyles";
import ThemedView from "./ThemedView";

export default function ThemedLoader({ style, ...props }) {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;
    const styles = UseAppStyles();

    return (
        <ThemedView>
            <ActivityIndicator size={'large'} color={theme.text} />
        </ThemedView>
    )
};