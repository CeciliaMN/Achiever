import { useRouter } from "expo-router";
import { useUser } from "../../hooks/useUser";
import { useEffect } from "react";
import ThemedLoader from "../ThemedLoader";

export function GuestOnly({ children }) {
    const { user, authChecked } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (authChecked && user !== null) {
            router.replace('/tracking');
        }
    }, [user, authChecked])

    if (!authChecked || user) {
        return (
            <ThemedLoader />
        )
    }

    return children;
}