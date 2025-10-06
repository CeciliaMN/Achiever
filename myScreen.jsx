import { Text, View, Image } from "react-native";
import { Link } from "expo-router";
import styles from './tools/styles';

const MyScreen = () => {
    return (
        <View style={ styles.container }>
                <Text style={ styles.normalText }>Base Screen</Text>                
                <Link href='/' style={ styles.link } >Back to Home</Link>
        </View>

    )
};

export default MyScreen;