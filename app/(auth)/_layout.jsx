import { useColorScheme } from "react-native";
import { Stack } from "expo-router";
import { Colors } from "../../constants/Colors";
import { UserProvider } from "../../contexts/UserContext";

export default function AuthLayout() {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;

    return (
        <UserProvider>
            <Stack screenOptions={{
                headerStyle: { backgroundColor: theme.navBackground },
                headerTintColor: theme.title,
                headerShown: false
            }}>
                <Stack.Screen name="signIn" options={{ title: 'Sign In' }} />
                <Stack.Screen name="signUp" options={{ title: 'Sign Up' }} />
            </Stack>
        </UserProvider>
    )
};