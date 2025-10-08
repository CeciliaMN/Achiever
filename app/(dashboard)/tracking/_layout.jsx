import { useColorScheme } from "react-native";
import { Stack, Tabs } from "expo-router";
import { Colors } from "../../../constants/Colors";
import { Ionicons } from '@expo/vector-icons'
import UseAppStyles from "../../../components/UseAppStyles";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UserProvider } from "../../../contexts/UserContext";
import { UserOnly } from "../../../components/auth/UserOnly";
import { TransactionsProvider } from "../../../contexts/TransactionsContext";

export default function TrackingLayout() {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;
    const styles = UseAppStyles();

    return (
        <UserProvider>
            <UserOnly>
                <TransactionsProvider>
                    <SafeAreaProvider>

                        <Stack screenOptions={{
                            headerStyle: { backgroundColor: theme.navBackground },
                            headerTintColor: theme.title,
                            headerShown: true
                        }}>
                            <Stack.Screen name="index" options={{ title: 'Tracking', headerShown: false }} />
                            <Stack.Screen name="newTransaction" options={{ title: 'New Transaction' }} />
                        </Stack>

                    </SafeAreaProvider>
                </TransactionsProvider>
            </UserOnly>
        </UserProvider>
    )
};