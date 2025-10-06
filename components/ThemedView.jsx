import { View, useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";
import UseAppStyles from "./UseAppStyles";

const ThemedView = ({ style, ...props }) => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;
    const styles = UseAppStyles();

    return (
        <View 
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