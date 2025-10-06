import { Pressable } from "react-native";
import { Link } from "expo-router";
import UseAppStyles from "../../components/UseAppStyles";
import ThemedView from "../../components/ThemedView";
import ThemedCard from "../../components/ThemedCard";
import Spacer from "../../components/Spacer";
import ThemedText from "../../components/ThemedText";
import Button from "../../components/Button";

const SignIn = () => {
    const styles = UseAppStyles();
    const handleSubmit = () => {
        console.log('Login Form Submitted.');
    };
    
    return (
        <ThemedView>
                <ThemedText title={ true } >Sign In to Your Account</ThemedText>  
                <Spacer height={ 15 }/>

                <ThemedCard>
                    <ThemedText>Instructions to sign in.</ThemedText>
                </ThemedCard>
                <Spacer height={20}/>

                <Button text={'Sign In'} onPress={handleSubmit} />
                <Spacer height={15} />

                <Link href='/signUp' style={ styles.link } >Sign Up</Link>

                <Link href='/' style={ styles.link } >Back to Home</Link>
        </ThemedView>

    )
};

export default SignIn;