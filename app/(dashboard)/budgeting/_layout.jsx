import { useColorScheme } from "react-native";
import { Stack, Tabs } from "expo-router";
import { Colors } from "../../../constants/Colors";
import { Ionicons } from '@expo/vector-icons'
import UseAppStyles from "../../../components/UseAppStyles";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UserProvider } from "../../../contexts/SupabaseUserContext";
import { UserOnly } from "../../../components/auth/UserOnly";
import { BudgetsProvider } from "../../../contexts/BudgetsContext";
import { ExpensesProvider } from "../../../contexts/ExpensesContext";
import { CategoriesProvider } from "../../../contexts/CategoriesContext";

export default function TrackingLayout() {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;
    const styles = UseAppStyles();

    console.log('LAYOUT BUDGETING');

    return (
        <UserProvider>
            <UserOnly>
                <ExpensesProvider>
                    <BudgetsProvider>
                        <CategoriesProvider>
                            <SafeAreaProvider>

                                <Stack screenOptions={{
                                    headerStyle: { backgroundColor: theme.navBackground },
                                    headerTintColor: theme.title,
                                    headerShown: true
                                }}>
                                    <Stack.Screen name="index" options={{ title: 'Budgeting', headerShown: false }} />
                                    <Stack.Screen name="newBudget" options={{ title: 'New Budget' }} />
                                    <Stack.Screen name="[id]" options={{ title: 'Budget Details', href: null }} />

                                    <Stack.Screen name="categories/newCategory" options={{ title: 'New Category' }} />

                                </Stack>

                            </SafeAreaProvider>
                        </CategoriesProvider>
                    </BudgetsProvider>
                </ExpensesProvider>
            </UserOnly>
        </UserProvider>
    )
};