import { Text, View, Image } from "react-native";
import { Link } from "expo-router";
import ThemedView from "../../components/ThemedView";
import UseAppStyles from "../../components/UseAppStyles";
import ThemedText from "../../components/ThemedText";
import Spacer from "../../components/Spacer";

export default function Add() {
    const styles = UseAppStyles();

    return (
        <ThemedView>
            <Image source={ Logo } style={ styles.logo }/>

            <View>
                <ThemedText title={ true }>Achiever</ThemedText>
                <Spacer height={5} />

                <ThemedText>Efficient Financial Management</ThemedText>
            </View>      
            
            <Spacer />
            <Link href='/signIn' style={ styles.link } >Sign In</Link>
        </ThemedView>
    )
};
