import { Text, View, Image, useColorScheme } from "react-native";
import { Link } from "expo-router";
import UseAppStyles from "../../components/UseAppStyles";
import ThemedView from "../../components/ThemedView";
import ThemedCard from "../../components/ThemedCard";
import Spacer from "../../components/Spacer";
import ThemedText from "../../components/ThemedText";

const SignUp = () => {
    const styles = UseAppStyles();
    
    return (
        <ThemedView>
                <ThemedText title={ true } >Sign Up</ThemedText>  

                <Spacer height={ 20 }/>
                <ThemedCard>
                    <ThemedText>Instructions to sign up.</ThemedText>
                </ThemedCard>
                <Spacer />

                <Link href='/signIn' style={ styles.link } >I already have an account</Link>
                
                <Spacer />

                <Link href='/' style={ styles.link } >Back to Home</Link>
        </ThemedView>

    )
};

export default SignUp;