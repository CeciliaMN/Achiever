import { Text, View, Image } from "react-native";
import { Link } from "expo-router";
import ThemedView from "../../components/ThemedView";
import UseAppStyles from "../../components/UseAppStyles";
import ThemedText from "../../components/ThemedText";
import Spacer from "../../components/Spacer";
import { useUser } from "../../hooks/useUser";
import ThemedButton from "../../components/ThemedButton";

export default function Profile() {
    const styles = UseAppStyles();

    const { user, authChecked } = useUser();

    function signUserOut() {
        signOut();
        router.replace('/');
    }
    return (
        <ThemedView safe={true}>
            <ThemedText title={true}>Profile</ThemedText>
            <Spacer height={20} />

            <ThemedText title={true}>
                {authChecked && user != null ? ` ${user.email}` : ''}
            </ThemedText>
            <Spacer />

            <ThemedButton onPress={signUserOut} text='Sign Out' />
        </ThemedView>
    )
};
