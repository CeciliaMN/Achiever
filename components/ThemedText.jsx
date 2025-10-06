import { Text, useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";
import UseAppStyles from "./UseAppStyles";

const ThemedText = ({ style, title = false,  ...props }) => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;
    const textColor = title ? theme.title : theme.text;

    const styles = UseAppStyles();
    const textStyle = title ? styles.title1 : styles.normalText;

    return (
        <Text 
            style={[
                { color: textColor },                
                textStyle,
                style
            ]}            
            { ...props }
        />

    )
};

export default ThemedText;