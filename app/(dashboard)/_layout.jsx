import { useColorScheme } from "react-native";
import { Tabs } from "expo-router";
import { Colors } from "../../constants/Colors";
import { Ionicons } from '@expo/vector-icons'
import UseAppStyles from "../../components/UseAppStyles";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UserProvider } from "../../contexts/UserContext";
import { UserOnly } from "../../components/auth/UserOnly";
import { TransactionsProvider } from "../../contexts/TransactionsContext";

export default function DashboardLayout() {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;
    const styles = UseAppStyles();

    return (
        <UserProvider>
            <UserOnly>
                <TransactionsProvider>
                    <SafeAreaProvider>
                        <Tabs screenOptions={{
                            headerStyle: { backgroundColor: theme.navBackground },
                            headerTintColor: theme.title,
                            headerShown: false,
                            tabBarStyle: styles.tabBar,
                            tabBarActiveTintColor: theme.iconColorFocused,
                            tabBarInactiveTintColor: theme.iconColor
                        }}>
                            <Tabs.Screen
                                name="tracking"
                                options={{
                                    title: 'Tracking',
                                    tabBarIcon: ({ focused }) => (
                                        <Ionicons
                                            size={30}
                                            name={focused ? "analytics" : "analytics-outline"}
                                            color={focused ? theme.iconColorFocused : theme.iconColor}
                                        />
                                    )
                                }}
                            />
                            <Tabs.Screen name="budgeting" options={{
                                title: 'Budgeting',
                                tabBarIcon: ({ focused }) => (
                                    <Ionicons
                                        size={24}
                                        name={focused ? "file-tray-stacked" : "file-tray-stacked-outline"}
                                        color={focused ? theme.iconColorFocused : theme.iconColor}
                                    />
                                )
                            }}
                            />
                            <Tabs.Screen name="planning" options={{
                                title: 'Planning',
                                tabBarIcon: ({ focused }) => (
                                    <Ionicons
                                        size={24}
                                        name={focused ? "calendar-number" : "calendar-number-outline"}
                                        color={focused ? theme.iconColorFocused : theme.iconColor}
                                    />
                                )
                            }}
                            />
                        <Tabs.Screen name="tracking/[transaction]" options={{ href: null }} />

                        </Tabs>

                    </SafeAreaProvider>
                </TransactionsProvider>
            </UserOnly>
        </UserProvider>
    )
};