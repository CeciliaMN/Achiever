import { Text, View, Image, useColorScheme } from "react-native";
import { Link } from "expo-router";
import UseAppStyles from "../../components/UseAppStyles";
import ThemedView from "../../components/ThemedView";
import ThemedCard from "../../components/ThemedCard";
import Spacer from "../../components/Spacer";
import ThemedText from "../../components/ThemedText";
import Button from "../../components/Button";
import ThemedLink from "../../components/ThemedLink";

const SignUp = () => {
    const styles = UseAppStyles();
    const handleSubmit = () => {
        console.log('Sign Up Form Submitted.');
    };

    return (
        <ThemedView>
            <ThemedText title={true} >Create a New Account</ThemedText>
            <Spacer height={15} />

            <ThemedCard>
                <ThemedText>Instructions to sign up.</ThemedText>
            </ThemedCard>
            <Spacer height={20} />

            <Button text={'Sign Up'} onPress={handleSubmit} />
            <Spacer height={15} />


            <ThemedLink href='/signIn'>Already have an account?</ThemedLink>
            <ThemedLink href='/'>Back to Home</ThemedLink>

        </ThemedView>

    )
};

export default SignUp;