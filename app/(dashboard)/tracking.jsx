import { Text, View, Image } from "react-native";
import { Link } from "expo-router";
import ThemedView from "../../components/ThemedView";
import UseAppStyles from "../../components/UseAppStyles";
import ThemedText from "../../components/ThemedText";
import Spacer from "../../components/Spacer";
import Button from "../../components/Button";
import { useUser } from "../../hooks/useUser";
import ThemedLink from "../../components/ThemedLink";

export default function Tracking() {
    const styles = UseAppStyles();

    const { user, signOut } = useUser();

    const mySignOut = () => {
        signOut();
        console.log('user after signOUt: ', user);
    }

    return (
        <ThemedView safe={ true }>
                <ThemedText title={ true }>Tracking</ThemedText>
                <Spacer height={30} />

                <Button onPress={ mySignOut } text='Sign Out' />

                <ThemedLink href='/'>Back to Home</ThemedLink>
        </ThemedView>
    )
};
