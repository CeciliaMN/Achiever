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

export default function NewTransaction() {
    const styles = UseAppStyles();
    const { user, signOut, authChecked } = useUser();
    const router = useRouter();

    function add() {
        // TODO: add transaction to database
        // TODO: clear fields
        // TODO: success message 
    }

    function cancel() {
        // TODO: clear fields
        router.replace('/tracking');
    }

    return (
        <ThemedView safe={true}>
            <ThemedView>
                <ThemedText>Hello{ authChecked && user!=null ? ` ${user.name}` : ''} !</ThemedText>

                <ThemedText title={true}>New Transaction</ThemedText>

                <ThemedButton onPress={signOut} text='Sign Out' />
            </ThemedView>

            <ThemedText>Hello{ authChecked && user!=null ? ` ${user.name}` : ''} !</ThemedText>


            
            <Spacer height={30} />

            <ThemedButton onPress={add} text='Add' />
            <ThemedButton onPress={cancel} text='Cancel' />

        </ThemedView>
    )
};
