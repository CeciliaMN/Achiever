import { View, useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";
import UseAppStyles from "./UseAppStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ThemedView = ({ style, safe = false, ...props }) => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;
    const styles = UseAppStyles();

    if (!safe) return (
        <View 
            style={[
                { backgroundColor: theme.background },
                styles.container,
                style
            ]}
            { ...props }
        />
    )

    const insets = useSafeAreaInsets();

    return (
        <View 
            style={[
                { 
                    backgroundColor: theme.background,
                    paddingTop: insets.top,
                    paddingBottom: insets.bottom
                },
                styles.container,
                style
            ]}
            { ...props }
        />
    )
};

export default ThemedView;