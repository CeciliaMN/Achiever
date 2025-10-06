import { StyleSheet, useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";

export default function UseAppStyles() {

    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;

    return StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.background,
            color: theme.text
        },

        title1: {
            fontWeight: 'bold',
            fontSize: 18,
            textAlign: 'center',
            color: theme.text
        },

        normalText: {
            textAlign: 'center',
            color: theme.text
        },

        card: {
            color: theme.text,
            padding: 20,
            borderRadius: 5,
            boxShadow: '4px 4px rbga(0,0,0,0.1)'
        },

        link: {
            borderBottomWidth: 1,
            borderBottomColor: theme.text,
            marginTop: 20,
            color: theme.text
        },

        button: {
            padding: 15,
            borderRadius: 5
        },

        btnPressed: {
            opacity: 0.8
        },

        logo: {
            height: 60,
            resizeMode: 'contain'
        },

        tabBar: {
            backgroundColor: theme.navBackground,
            paddingTop: 3
        }
    });
}

