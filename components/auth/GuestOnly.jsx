import { useRouter } from "expo-router";
import { useUser } from "../../hooks/useUser";
import { useEffect } from "react";
import ThemedLoader from "../ThemedLoader";

export function GuestOnly({ children }) {
    const { user, authChecked } = useUser();
    const router = useRouter();

    console.log('Auth checked, in Guest Only page: ', authChecked);
    console.log('User, in Guest Only page: ', user);

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