import { View, useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";
import UseAppStyles from "./UseAppStyles";

const ThemedCard = ({ style, ...props }) => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;
    const styles = UseAppStyles();

    return (
        <View 
            style={[
                { backgroundColor: theme.uiBackground },
                styles.card,
                style
            ]}
            { ...props }
        />

    )
};

export default ThemedCard;