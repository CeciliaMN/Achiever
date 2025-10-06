import { Text, View, Image, useColorScheme } from "react-native";
import { Link } from "expo-router";
import styles from './tools/styles';
import { Colors } from "../constants/Colors";

const MyScreen = () => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;

    return (
        <View style={ styles.container }>
                <Text style={ styles.normalText }>Base Screen</Text>                
                <Link href='/' style={ styles.link } >Back to Home</Link>
        </View>

    )
};

export default MyScreen;