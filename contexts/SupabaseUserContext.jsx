import { createContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import * as Linking from 'expo-linking';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // --- Auth methods ---

  async function signIn() {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log('Sign In error:', error.message);
    } else {
      console.info('✅ Sign in success');
      setUser(data.user);
      setSession(data.session);
    }
    setLoading(false);
  }

  async function signUp() {
    if (!email || !password) {
      console.error('Email ou mot de passe manquant.');
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      console.error('Sign Up error:', error.message);
    } else if (data?.user?.identities?.length === 0) {
      console.info('Un compte existe déjà avec cet email.');
    } else {
      console.info('Un lien de confirmation t’a été envoyé par email.');
    }
    setLoading(false);
  }

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  }

  // --- Profile fetching ---
  /*
    async function getProfile() {
      try {
        setLoading(true);
        if (!session?.user) throw new Error('No active session!');
  
        const { data, error } = await supabase
          .from('profiles')
          .select(`username, website, avatar_url`)
          .eq('id', session.user.id)
          .single();
  
        if (error) throw error;
        setProfile(data);
      } catch (err) {
        console.error('Profile fetch error:', err.message);
      } finally {
        setLoading(false);
      }
    }
  */
  // --- Session handling ---

  useEffect(() => {
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        setSession(session);
        setUser(session.user);
      } else {
        console.log('❌ Aucune session active au démarrage.');
      }

      setAuthChecked(true);

      const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      });

      return () => subscription.subscription.unsubscribe();
    };

    initAuth();

    const urlListener = Linking.addEventListener('url', (event) => {
      console.log('📩 App ouverte avec lien:', event.url);
    });

    return () => {
      urlListener.remove();
    };
  }, []);

  // 4️⃣ Récupère le profil quand la session est prête
  /*
  useEffect(() => {
    if (session?.user) {
      getProfile();
    }
  }, [session?.user]);
  */

  return (
    <UserContext.Provider
      value={{
        user,
        session,
        profile,
        signIn,
        signUp,
        signOut,
        //getProfile,
        email,
        setEmail,
        password,
        setPassword,
        authChecked,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
