import { createContext, useEffect, useState } from 'react';
import { account } from '../lib/appwrite';
import { ID } from 'react-native-appwrite';

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [authChecked, setAuthChecked] = useState(false);

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
            await account.create(ID.unique(), email, password, username);
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

    async function getInitialUserValue() {
        try {
            const response = await account.get();
            setUser(response);
            console.log('initial user value: ', response);
        }
        catch(error) {
            console.log(`initial user value failed; ${ error.message }; `, user);
            setUser(null);
        }
        finally {
            setAuthChecked(true);
        }
    }

    useEffect(() => {
        getInitialUserValue();
    }, [])

    return (
        <UserContext.Provider value={{ user, signIn, signUp, signOut, authChecked }}>
            {children}
        </UserContext.Provider>
    )
}