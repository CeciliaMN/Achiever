import { Text, View, Image, useColorScheme, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Link } from "expo-router";
import UseAppStyles from "../../components/UseAppStyles";
import ThemedView from "../../components/ThemedView";
import ThemedCard from "../../components/ThemedCard";
import Spacer from "../../components/Spacer";
import ThemedText from "../../components/ThemedText";
import ThemedButton from "../../components/ThemedButton";
import ThemedLink from "../../components/ThemedLink";
import ThemedTextInput from "../../components/ThemedTextInput";
import { useState } from "react";
import { useUser } from "../../hooks/useUser";

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { user, signUp } = useUser();

    const styles = UseAppStyles();

    const handleSubmit = async () => {
        console.log('Sign Up Form Submitted.');
        console.log('user before sign up: ', user);
        await signUp(username, email, password);
        console.log('user after sign up: ', user);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ThemedView>
                <ThemedText title={true} >Create a New Account</ThemedText>
                <Spacer height={20} />

                <ThemedTextInput
                    placeholder='Username'
                    onChangeText={setUsername}
                    value={username}
                />
                <Spacer height={15} />

                <ThemedTextInput
                    placeholder='Email'
                    keyboardType='email-address'
                    onChangeText={setEmail}
                    value={email}
                />
                <Spacer height={15} />

                <ThemedTextInput
                    placeholder='Password'
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry
                />
                <Spacer height={15} />

                <ThemedButton text={'Sign Up'} onPress={handleSubmit} />
                <Spacer height={15} />


                <ThemedLink href='/signIn'>Already have an account?</ThemedLink>
                <ThemedLink href='/'>Back to Home</ThemedLink>

            </ThemedView>
        </TouchableWithoutFeedback>
    )
};

export default SignUp;