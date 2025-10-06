import { Text, View, Image, useColorScheme } from "react-native";
import { Link } from "expo-router";
import { Colors } from "../constants/Colors";
import ThemedText from "../components/ThemedText";
import UseAppStyles from "../components/UseAppStyles";

const MyScreen = () => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;
    const styles = UseAppStyles();
    
    return (
        <ThemedView>
                <ThemedText>Base Screen</ThemedText>                
                <Link href='/' style={ styles.link } >Back to Home</Link>
        </ThemedView>

    )
};

export default MyScreen;