import { createContext, useState } from 'react';
import { account } from '../lib/appwrite';
import { ID } from 'react-native-appwrite';

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    async function signIn(email, password) {
        try {
            await account.createEmailPasswordSession(email, password);
            const response = await account.get();
            setUser(response);
        }
        catch (error) {
            console.log(error.message);
        }
    }

    async function signUp(username, email, password) {
        try {
            await account.create(ID.unique(), email, password);
            console.log('account create done');
            await signIn(email, password);
            console.log('signin done');

        }
        catch (error) {
            console.log(error.message);
        }
    }

    async function signOut() {
        await account.deleteSession('current');
        console.log('signout done');
    }

    return (
        <UserContext.Provider value={{ user, signIn, signUp, signOut }}>
            {children}
        </UserContext.Provider>
    )
}