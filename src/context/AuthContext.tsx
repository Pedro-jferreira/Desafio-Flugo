import { createContext, useContext, useEffect, useState, type ReactNode,  } from 'react';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged, 
    type User,
    type UserCredential
} from 'firebase/auth';
import { auth } from '../../firebase-config';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, pass: string) => Promise<UserCredential>;
  signUp: (email: string, pass: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
}
const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                const token = await currentUser.getIdToken();
                console.log("JWT Token:", token); 
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const signIn = (email: string, pass: string) => signInWithEmailAndPassword(auth, email, pass).then();
    const signUp = (email: string, pass: string) => createUserWithEmailAndPassword(auth, email, pass).then();
    const logOut = () => signOut(auth);

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signUp, logOut }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);