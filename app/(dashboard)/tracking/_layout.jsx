import { useColorScheme } from "react-native";
import { Stack, Tabs } from "expo-router";
import { Colors } from "../../../constants/Colors";
import { Ionicons } from '@expo/vector-icons'
import UseAppStyles from "../../../components/UseAppStyles";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UserProvider } from "../../../contexts/SupabaseUserContext";
import { UserOnly } from "../../../components/auth/UserOnly";
import { ExpensesProvider } from "../../../contexts/ExpensesContext";
import { CategoriesProvider } from "../../../contexts/CategoriesContext";

export default function TrackingLayout() {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;
    const styles = UseAppStyles();

console.log('LAYOUT TRACKING');

    return (
        <UserProvider>
            <UserOnly>
                <CategoriesProvider>
                    <ExpensesProvider>
                        <SafeAreaProvider>

                            <Stack screenOptions={{
                                headerStyle: { backgroundColor: theme.navBackground },
                                headerTintColor: theme.title,
                                headerShown: true
                            }}>
                                <Stack.Screen name="index" options={{ title: 'Tracking', headerShown: false }} />
                                <Stack.Screen name="newExpense" options={{ title: 'New Expense' }} />
                                <Stack.Screen name="[id]" options={{ title: 'Expense Details', href: null }} />
                            </Stack>

                        </SafeAreaProvider>
                    </ExpensesProvider>
                </CategoriesProvider>
            </UserOnly>
        </UserProvider>
    )
};