import { useColorScheme } from "react-native";
import { Tabs } from "expo-router";
import { Colors } from "../../constants/Colors";

export default function TransactionsLayout() {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;

    return (
        <Tabs screenOptions={{
            headerStyle: { backgroundColor: theme.navBackground },
            headerTintColor: theme.title, 
            headerShown: false 
        }}>
            <Tabs.Screen name="view" options={{ title: 'View' }} />
            <Tabs.Screen name="add" options={{ title: 'Add' }} />
            <Tabs.Screen name="edit" options={{ title: 'Edit' }} />
        </Tabs>
    )
};