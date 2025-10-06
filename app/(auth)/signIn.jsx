import { Text, View, Image, useColorScheme } from "react-native";
import { Link } from "expo-router";
import UseAppStyles from "../../components/UseAppStyles";
import ThemedView from "../../components/ThemedView";
import ThemedCard from "../../components/ThemedCard";
import Spacer from "../../components/Spacer";
import ThemedText from "../../components/ThemedText";

const Connexion = () => {
    const styles = UseAppStyles();
    
    return (
        <ThemedView>
                <ThemedText title={ true } >Sign In</ThemedText>  

                <Spacer height={ 20 }/>
                <ThemedCard>
                    <ThemedText>Instructions to sign in.</ThemedText>
                </ThemedCard>
                <Spacer />

                <Link href='/' style={ styles.link } >Cancel</Link>
        </ThemedView>

    )
};

export default Connexion;