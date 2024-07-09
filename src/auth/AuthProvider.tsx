import {
  User,
  UserCredential, //typ, który zawiera informacje o uwierzytelnieniu użytkownika
  createUserWithEmailAndPassword, //Funkcja, która tworzy nowego użytkownika z wykorzystaniem adresu e-mail i hasła
  ///Funkcja, która rejestruje obserwatora zmian stanu uwierzytelnienia. Obserwator jest wywoływany za każdym razem,
  //gdy stan uwierzytelnienia użytkownika się zmienia (np. użytkownik loguje się lub wylogowuje)
  signInWithEmailAndPassword, //Funkcja, która loguje użytkownika za pomocą adresu e-mail i hasła
  signOut, //Funkcja, która wylogowywuje użytkownika
} from "firebase/auth";
import { ReactNode, createContext, useState } from "react";
import auth from "../../firebaseConfig";

export type AuthProviderProps = {
  children: ReactNode;
};

export type AuthContextValue = {
  createUser: (email: string, password: string) => Promise<UserCredential>;
  loginUser: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  user: User | null;
  isLoading: boolean;
};

const defaultAuthContextValue: AuthContextValue = {
  createUser: async (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    // Domyślna implementacja, np. zwrócenie pustego obiektu
    return {} as void;
  },
  loginUser: async (email: string, password: string): Promise<void> => {
    // Domyślna implementacja, np. zwrócenie pustego obiektu
    return {} as void;
  },
  logOut: async (): Promise<void> => {
    // Domyślna implementacja
  },
  user: null,
  isLoading: false,
};

export const AuthContext = createContext<AuthContextValue>( //typ opisujący
  defaultAuthContextValue
); //Tworzenie kontekstu uwierzytelniania
//createContext: Tworzy nowy kontekst z domyślną wartością defaultAuthContextValue

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function createUser(email: string, password: string) {
    setIsLoading(true);

    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }

    //Ustawia isLoading na true i wywołuje createUserWithEmailAndPassword z Firebase, co tworzy nowego użytkownika z podanym e-mailem i hasłem.
  }

  async function loginUser(email: string, password: string) {
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function logOut() {
    setIsLoading(true);
    return signOut(auth);
  }

  //Monitorowanie stanu uwierzytelnienia
  //useEffect: Hook Reacta, który wykonuje efekt uboczny po renderowaniu komponentu.
  //onAuthStateChanged: Funkcja Firebase, która nasłuchuje zmiany stanu uwierzytelnienia (np. logowanie, wylogowywanie)
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (newUser) => {
  //     setUser(newUser);
  //     setIsLoading(false);
  //   });

  //   //unsubscribe: Funkcja zwrotna, która usuwa nasłuchiwacza zmian stanu, gdy komponent AuthProvider jest odmontowywany.
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  const authContextValue: AuthContextValue = {
    createUser,
    loginUser,
    logOut,
    user,
    isLoading,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
