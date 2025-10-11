import { Text, View, Image } from "react-native";
import { Link } from "expo-router";
import Logo from '../assets/providential_logo.png';
import ThemedView from "../components/ThemedView";
import UseAppStyles from "../components/UseAppStyles";
import ThemedText from "../components/ThemedText";
import Spacer from "../components/Spacer";
import ThemedLink from "../components/ThemedLink";

export default function Home() {
    const styles = UseAppStyles();

    return (
        <ThemedView>
            <Image source={Logo} style={styles.logo} />

            <View>
                <ThemedText title={true}>Achiever</ThemedText>
                <Spacer height={5} />

                <ThemedText>Efficient Financial Management</ThemedText>
            </View>

            <Spacer />
            <ThemedLink href='/signIn'>Sign In</ThemedLink>
            <Spacer height={15} />

            <ThemedLink href='/tracking'>Continue as Guest</ThemedLink>
        </ThemedView>
    )
};
