import { View, useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";
import UseAppStyles from "./UseAppStyles";
import { SafeAreaView } from "react-native-safe-area-context";

const ThemedView = ({ style, ...props }) => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;
    const styles = UseAppStyles();

    return (
        <SafeAreaView 
            style={[
                { backgroundColor: theme.background },
                styles.container,
                style
            ]}
            { ...props }
        />

    )
};

export default ThemedView;