import { createContext, useEffect, useState } from 'react';
import { supabase, APP_URL, EXPO_APP_URL } from '../lib/supabase';
import { Session } from '@supabase/supabase-js'
import * as Linking from 'expo-linking';
import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as WebBrowser from "expo-web-browser";
import { router } from 'expo-router';

export const UserContext = createContext();

/*
WebBrowser.maybeCompleteAuthSession(); // required for web only
const redirectTo = makeRedirectUri();

const createSessionFromUrl = async (url) => {
   const { params, errorCode } = QueryParams.getQueryParams(url);
   if (errorCode) throw new Error(errorCode);
   const { access_token, refresh_token } = params;
   if (!access_token) return;
   const { data, error } = await supabase.auth.setSession({
       access_token,
       refresh_token,
   });
   if (error) throw error;
   return data.session;
};

const performOAuth = async () => {
   const { data, error } = await supabase.auth.signInWithOtp({
       provider: "Google",
       options: {
           redirectTo,
           skipBrowserRedirect: true,
       },
   });
   if (error) throw error;
   const res = await WebBrowser.openAuthSessionAsync(
       data?.url ?? "",
       redirectTo
   );
   if (res.type === "success") {
       const { url } = res;
       await createSessionFromUrl(url);
   }
};

const sendMagicLink = async () => {
   const { error } = await supabase.auth.signInWithOtp({
       email: email,
       options: {
           emailRedirectTo: redirectTo,
       },
   });
   if (error) throw error;
   // Email sent.
};
*/

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [authChecked, setAuthChecked] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function signIn() {
        setLoading(true)

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.log('Sign In method error: ', error.message);
        } else {
            console.info("Sign in success!");
            setUser(data);
            setAuthChecked(true);

            //   router.replace('/tracking');
        }

        setLoading(false)
    }

    async function signUp() {
        if (!email || !password) {
            console.error('Invalid email or password, fill in all fields.');
            return;
        }

        setLoading(true)

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        setLoading(false)

        if (error) {
            console.error(error.message);
        } else if (data?.user?.identities?.length === 0) {
            // L'utilisateur existe déjà
            console.info("Un compte existe déjà avec cet email.");
        } else {
            console.info("Un lien de confirmation t’a été envoyé. Clique dessus pour activer ton compte."
            );
        }
    }

    async function signOut() {
        supabase.auth.signOut()
    }

    async function getProfile() {
        try {
            setLoading(true);
            if (!Session?.user) throw new Error('No user on the Session!');

            const { data, error, status } = await supabase
                .from('profiles')
                .select(`username, website, avatar_url`)
                .eq('id', Session?.user.id)
                .single();

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setUser(data);
            }

        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message)
            }
        } finally {
            setLoading(false);
            setAuthChecked(true);
        }
    }

    async function updateProfile({ username, website, avatar_url }) {
        try {
            setLoading(true)
            if (!Session?.user) throw new Error('No user on the Session!')
            const updates = {
                id: Session?.user.id,
                username,
                website,
                avatar_url,
                updated_at: new Date(),
            }
            const { error } = await supabase.from('profiles').upsert(updates)
            if (error) {
                throw error
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const initSession = async () => {
            const {
                data: { session },
                error,
            } = await supabase.auth.getSession();

            if (error) {
                console.error("Error while fetching session: ", error.message);
            } else if (session) {
                console.log("Session restored: ", session.user.email);
                setUser(session.user);
            }

            setAuthChecked(true);
        };

        // Écouter les changements d’auth (connexion/déconnexion)
        const { data: listener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                console.log("Auth event:", event);
                if (session) {
                    setUser(session.user);
                } else {
                    setUser(null);
                }
            }
        );

        initSession();


        const handleUrl = async () => {
            const url = Linking.addEventListener('url', () => {
                console.log('App open with link :', url);
            })
        };
        handleUrl();

        if (Session) {
            console.log('SBUSERCNTEXT getProfile User update.');
            getProfile();
        }
    }, [Session])

    return (
        <UserContext.Provider value={{
            user, signIn, signUp, signOut, authChecked,
            loading, email, setEmail, password, setPassword
        }}>
            {children}
        </UserContext.Provider>
    )
}