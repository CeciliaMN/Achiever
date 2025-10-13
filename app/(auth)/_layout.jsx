import { useColorScheme } from "react-native";
import { Stack } from "expo-router";
import { Colors } from "../../constants/Colors";
import { UserProvider } from "../../contexts/SupabaseUserContext";
import { GuestOnly } from "../../components/auth/GuestOnly";

export default function AuthLayout() {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;

    console.log('LAYOUT AUTH');

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