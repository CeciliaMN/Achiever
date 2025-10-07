import { Text, View, Image, useColorScheme } from "react-native";
import { Link, Stack } from "expo-router";
import { Colors } from "../constants/Colors";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UserProvider } from "../contexts/UserContext";

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;

    return (
        <UserProvider>
            <SafeAreaProvider>
                <Stack screenOptions={{
                    headerStyle: { backgroundColor: theme.navBackground },
                    headerTintColor: theme.title,
                    headerShown: false
                }}>
                    <Stack.Screen name="index" options={{ title: 'Home' }} />
                </Stack>
            </SafeAreaProvider>
        </UserProvider>
    )
};
