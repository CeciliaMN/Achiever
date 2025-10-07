import { Text, View, Image, useColorScheme, Pressable } from "react-native";
import { Link } from "expo-router";
import { Colors } from "../constants/Colors";
import ThemedText from "./ThemedText";
import UseAppStyles from "./UseAppStyles";

const ThemedButton = ({ style, text, onPress, ...props}) => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;
    const styles = UseAppStyles();

    return (
        <Pressable 
            onPress={ onPress }
            style={({ pressed }) => [
                { backgroundColor: Colors.primary },
                styles.button,
                pressed && styles.btnPressed,
                style
            ]}
            { ...props }
        > 
            <Text style={{ color: '#f2f2f2', fontWeight: 'bold' }}> {text} </Text>
        </Pressable>
    )
};

export default ThemedButton;