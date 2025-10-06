import { Text, View, Image, useColorScheme } from "react-native";
import { Link } from "expo-router";
import UseAppStyles from "../../components/UseAppStyles";
import ThemedView from "../../components/ThemedView";
import ThemedCard from "../../components/ThemedCard";
import Spacer from "../../components/Spacer";
import ThemedText from "../../components/ThemedText";
import Button from "../../components/Button";

const SignUp = () => {
    const styles = UseAppStyles();
    const handleSubmit = () => {
        console.log('Sign Up Form Submitted.');
    };
    
    return (
        <ThemedView>
                <ThemedText title={ true } >Create a New Account</ThemedText>  
                <Spacer height={ 15 }/>

                <ThemedCard>
                    <ThemedText>Instructions to sign up.</ThemedText>
                </ThemedCard>
                <Spacer height={20}/>
                
                <Button text={'Sign Up'} onPress={handleSubmit} />
                <Spacer height={15} />

                <Link href='/signIn' style={ styles.link } >Already have an account?</Link>

                <Link href='/' style={ styles.link } >Back to Home</Link>
        </ThemedView>

    )
};

export default SignUp;