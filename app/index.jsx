import { Text, View, Image } from "react-native";
import { Link } from "expo-router";
import Logo from '../assets/providential_logo.png';
import ThemedView from "../components/ThemedView";
import UseAppStyles from "../components/UseAppStyles";
import ThemedText from "../components/ThemedText";
import Spacer from "../components/Spacer";

const Home = () => {
    const styles = UseAppStyles();

    return (
        <ThemedView>
            <Image source={ Logo } style={ styles.logo }/>

            <View>
                <ThemedText title={ true }>Achiever</ThemedText>
                <ThemedText>Efficient finances management</ThemedText>
            </View>      
            
            <Spacer />
            <Link href='/signIn' style={ styles.link } >Sign In</Link>
        </ThemedView>
    )
};

export default Home;
