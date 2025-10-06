import { StyleSheet, useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";

const colorScheme = useColorScheme();
const theme = Colors[colorScheme] ?? Colors.light;

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.background
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

    link: {
        borderBottomWidth: 1,
        marginTop: 20
    },

    logo: {
        marginVertical: 5,
        height: 80,
        resizeMode: 'contain'
    }
});