import { Text, View, Image, useColorScheme } from "react-native";
import { Link, Stack } from "expo-router";
import { Colors } from "../constants/Colors";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UserContext, UserProvider } from "../contexts/SupabaseUserContext";
import { supabase } from "../lib/supabase";
import { useEffect } from "react";
import * as Linking from 'expo-linking';

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;

console.log('LAYOUT HOME');

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
