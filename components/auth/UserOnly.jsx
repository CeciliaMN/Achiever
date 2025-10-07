import { useRouter } from "expo-router";
import { useUser } from "../../hooks/useUser";
import ThemedView from "../ThemedView";
import { useEffect } from "react";
import { Text } from "react-native";

export function UserOnly({ children }) {
    const { user, authChecked } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (authChecked && user === null) {
            router.replace('/signIn');
        }
    }, [user, authChecked])

    if (!authChecked || !user) {
        return (
            <ThemedView>
                <Text>Loading</Text>
            </ThemedView>
        )
    }

    return children;
}