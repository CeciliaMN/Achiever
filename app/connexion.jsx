import { Text, View, Image } from "react-native";
import { Link } from "expo-router";
import styles from './tools/styles';

const Connexion = () => {
    return (
        <View style={ styles.container }>
                <Text style={ styles.normalText }>Connexion</Text>                
                <Link href='/' style={ styles.link } >Back to Home</Link>
        </View>

    )
};

export default Connexion;