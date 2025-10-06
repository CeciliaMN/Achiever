import { Text, View, Image, useColorScheme } from "react-native";
import { Link } from "expo-router";
import styles from './tools/styles';
import { Colors } from "../constants/Colors";
import ThemedText from "../components/ThemedText";

const MyScreen = () => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;

    return (
        <ThemedView>
                <ThemedText>Base Screen</ThemedText>                
                <Link href='/' style={ styles.link } >Back to Home</Link>
        </ThemedView>

    )
};

export default MyScreen;