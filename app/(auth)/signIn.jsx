import { Keyboard, Pressable, TouchableWithoutFeedback } from "react-native";
import { Link, router } from "expo-router";
import UseAppStyles from "../../components/UseAppStyles";
import ThemedView from "../../components/ThemedView";
import ThemedCard from "../../components/ThemedCard";
import Spacer from "../../components/Spacer";
import ThemedText from "../../components/ThemedText";
import ThemedButton from "../../components/ThemedButton";
import ThemedLink from "../../components/ThemedLink";
import ThemedTextInput from "../../components/ThemedTextInput";
import { useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser";

export default function SignIn() {

    const { user, signIn, email, setEmail, password, setPassword, authChecked } = useUser();

    const styles = UseAppStyles();

    const handleSubmit = async () => {
        console.log('Login Form Submitted.');
        console.log('user before sign in (Sign in page): ', user);
        await signIn();
        console.log('user after sign in (Sign in page): ', user);

        if (authChecked && user) {
            console.info('Sign in page: Already signed in.');

            router.replace('/tracking');
        }
    };

    useEffect(() => {
        if (authChecked && user) {
            console.info('Sign in page: Already signed in.');

            router.replace('/tracking');
        }
    }, [authChecked, user])

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

                <ThemedButton text={'Sign In'} onPress={handleSubmit} />
                <Spacer height={15} />

                <ThemedLink href='/signUp'>Sign Up</ThemedLink>
                <ThemedLink href='/'>Back to Home</ThemedLink>
                <ThemedLink href='/tracking'>Tracking</ThemedLink>
            </ThemedView>
        </TouchableWithoutFeedback>
    )
};