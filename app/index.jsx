import { StyleSheet, Text, View, Image } from "react-native";
import Logo from '../assets/providential_logo.png';

const Home = () => {
    return (
        <View style={ styles.container }>
            <Image source={ Logo } style={ styles.logo }/>

            <View>
                <Text style={ styles.title1 }>Achiever</Text>
                <Text style={ styles.normalText }>Efficient finances management</Text>
            </View>
        </View>
    )
};

export default Home;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    title1: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center'
    },

    normalText: {
        textAlign: 'center'
    },

    card: {
        backgroundColor: '#eee',
        padding: 20,
        borderRadius: 5,
        boxShadow: '4px 4px rbga(0,0,0,0.1)'
    },

    logo: {
        marginVertical: 5,
        height: 80,
        resizeMode: 'contain'
    }
});