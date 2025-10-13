import { useContext } from "react";
import { UserContext } from "../contexts/SupabaseUserContext";

export function useUser() {
    const context = useContext(UserContext);

   const { user, authChecked } = context;

    if (!context) {
        throw new Error('useUser must be used within a UserProvider.');
    }

    return context;
}