import { Text, View, Image, useColorScheme } from "react-native";
import { Link, Stack } from "expo-router";
import { Colors } from "../constants/Colors";

const RootLayout = () => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;

    return (
        <Stack screenOptions={{
            headerStyle: { backgroundColor: theme.navBackground },
            headerTintColor: theme.title,
            headerShown: false 
        }}>
            <Stack.Screen name="index" options={{ title: 'Home'}} />
            <Stack.Screen name="tracking" options={{ title: 'Tracking' }} />
            <Stack.Screen name="budgeting" options={{ title: 'Budgeting' }} />
            <Stack.Screen name="planning" options={{ title: 'Planning' }} />
        </Stack>
    )
};

export default RootLayout;