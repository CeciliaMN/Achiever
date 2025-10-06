import { Text, View, Image } from "react-native";
import { Link } from "expo-router";
import styles from './tools/styles';
import Logo from '../assets/providential_logo.png';

const Home = () => {
    return (
        <View style={ styles.container }>
            <Image source={ Logo } style={ styles.logo }/>

            <View>
                <Text style={ styles.title1 }>Achiever</Text>
                <Text style={ styles.normalText }>Efficient finances management</Text>
            </View>      
            
            <Link href='/connexion' style={ styles.link } >Connexion</Link>
        </View>
    )
};

export default Home;
