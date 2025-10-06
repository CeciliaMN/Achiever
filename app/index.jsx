import { Text, View, Image } from "react-native";
import { Link } from "expo-router";
import Logo from '../assets/providential_logo.png';
import ThemedView from "../components/ThemedView";
import UseAppStyles from "../components/UseAppStyles";

const Home = () => {
    const styles = UseAppStyles();

    return (
        <ThemedView>
            <Image source={ Logo } style={ styles.logo }/>

            <View>
                <Text style={ styles.title1 }>Achiever</Text>
                <Text style={ styles.normalText }>Efficient finances management</Text>
            </View>      
            
            <Link href='/signIn' style={ styles.link } >Sign In</Link>
        </ThemedView>
    )
};

export default Home;
