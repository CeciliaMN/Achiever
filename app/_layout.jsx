import { Text, View, Image, useColorScheme } from "react-native";
import { Link, Stack } from "expo-router";
import styles from './tools/styles';
import { Colors } from "../constants/Colors";

const RootLayout = () => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;

    return (
        <Stack screenOptions={{
            headerStyle: { backgroundColor: theme.navBackground },
            headerTintColor: theme.title
        }}>
            <Stack.Screen name="index" options={{ title: 'Home', headerShown: false }} />
            <Stack.Screen name="signIn" options={{ title: 'Sign In' }} />
        </Stack>
    )
};

export default RootLayout;