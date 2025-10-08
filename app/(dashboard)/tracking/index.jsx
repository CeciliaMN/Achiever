import { Text, View, Image } from "react-native";
import { Link, useRouter } from "expo-router";
import ThemedView from "../../../components/ThemedView";
import UseAppStyles from "../../../components/UseAppStyles";
import ThemedText from "../../../components/ThemedText";
import Spacer from "../../../components/Spacer";
import ThemedButton from "../../../components/ThemedButton";
import { useUser } from "../../../hooks/useUser";
import ThemedLink from "../../../components/ThemedLink";
import { useEffect } from "react";

export default function Tracking() {
    const styles = UseAppStyles();
    const { user, signOut, authChecked } = useUser();
    const router = useRouter();

    function goToNew() {
        router.replace('/tracking/newTransaction');
    }

    return (
        <ThemedView safe={true}>
            <ThemedView>
                <ThemedText title={true}>Tracking</ThemedText>
                <ThemedButton onPress={signOut} text='Sign Out' />
            </ThemedView>

            <ThemedText>Hello{ authChecked && user!=null ? ` ${user.name}` : ''} !</ThemedText>

            <ThemedButton onPress={goToNew} text='New' />
            
            <Spacer height={30} />

            <ThemedButton onPress={signOut} text='Sign Out' />

            <ThemedLink href='/'>Back to Home</ThemedLink>
        </ThemedView>
    )
};
