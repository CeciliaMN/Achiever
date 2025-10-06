import { Text, View, Image, useColorScheme } from "react-native";
import { Link } from "expo-router";
import UseAppStyles from "../components/UseAppStyles";
import ThemedView from "../components/ThemedView";

const Connexion = () => {
    const styles = UseAppStyles();
    
    return (
        <ThemedView style={ styles.container }>
                <Text style={ styles.normalText }>Sign In</Text>                
                <Link href='/' style={ styles.link } >Back to Home</Link>
        </ThemedView>

    )
};

export default Connexion;