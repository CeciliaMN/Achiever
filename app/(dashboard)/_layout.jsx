import { useColorScheme } from "react-native";
import { Tabs } from "expo-router";
import { Colors } from "../../constants/Colors";

export default function DashboardLayout() {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;

    return (
        <Tabs screenOptions={{
            headerStyle: { backgroundColor: theme.navBackground },
            headerTintColor: theme.title, 
            headerShown: false ,
            tabBarStyle: {
                backgroundColor: theme.navBackground
            },
            tabBarActiveTintColor: theme.iconColorFocused,
            tabBarInactiveTintColor: theme.iconColor
        }}>
            <Tabs.Screen name="tracking" options={{ title: 'Tracking' }} />
            <Tabs.Screen name="budgeting" options={{ title: 'Budgeting' }} />
            <Tabs.Screen name="planning" options={{ title: 'Planning' }} />
        </Tabs>
    )
};