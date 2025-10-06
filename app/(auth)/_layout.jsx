import { useColorScheme } from "react-native";
import { Stack } from "expo-router";
import { Colors } from "../../constants/Colors";

const AuthLayout = () => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;

    return (
        <Stack screenOptions={{
            headerStyle: { backgroundColor: theme.navBackground },
            headerTintColor: theme.title
        }}>
            <Stack.Screen name='(auth)' options={{ title: '', headerShown: false }} />
            <Stack.Screen name="signIn" options={{ title: 'Sign In' }} />
        </Stack>
    )
};

export default AuthLayout;