import { Keyboard, Pressable, TouchableWithoutFeedback } from "react-native";
import { Link } from "expo-router";
import UseAppStyles from "../../components/UseAppStyles";
import ThemedView from "../../components/ThemedView";
import ThemedCard from "../../components/ThemedCard";
import Spacer from "../../components/Spacer";
import ThemedText from "../../components/ThemedText";
import Button from "../../components/Button";
import ThemedLink from "../../components/ThemedLink";
import ThemedTextInput from "../../components/ThemedTextInput";
import { useState } from "react";
import { useUser } from "../../hooks/useUser";

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { user, signIn } = useUser();

    const styles = UseAppStyles();

    const handleSubmit = async () => {
        console.log('Login Form Submitted.');
        console.log('user before sign in: ', user);
        await signIn(email, password);
        console.log('user after sign in: ', user);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ThemedView>
                <ThemedText title={true} >Sign In to Your Account</ThemedText>
                <Spacer height={20} />

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

                <Button text={'Sign In'} onPress={handleSubmit} />
                <Spacer height={15} />

                <ThemedLink href='/signUp'>Sign Up</ThemedLink>
                <ThemedLink href='/'>Back to Home</ThemedLink>
                <ThemedLink href='/tracking'>Tracking</ThemedLink>
            </ThemedView>
        </TouchableWithoutFeedback>
    )
};