import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUtilisateur } from '../@types/index';

type UserContextType = {
  user: IUtilisateur | null;
  setUser: React.Dispatch<React.SetStateAction<IUtilisateur | null>>;
  token: string | null;
  /* setToken: React.Dispatch<React.SetStateAction<string | null>>; */
  userMessage: string | null;
  /* setUserMessage : React.Dispatch<React.SetStateAction<string | null>>; */
  logIn : (credentials : any) => Promise<void>;
  logOut(): Promise<void>;
};

type UserContextProviderProps = {
  children: React.ReactNode;
};

export const UserContext = createContext<UserContextType | null>(null);

export default function UserContextProvider({
  children,
}: UserContextProviderProps) {
  const [user, setUser] = useState<IUtilisateur | null>(null);
  const [userMessage, setUserMessage] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();

  async function logIn(credentials : any) {

    setUserMessage(null)
    try {
      const response = await fetch
        (`${import.meta.env.VITE_API_URL}/connexion`,
        {
          method: 'POST',
          headers: { "Content-type" : "application/json" },
          body: JSON.stringify(credentials),
        }
      );

      const res = await response.json();

      if (!res.ok) {
        setUserMessage(res.message)
        navigate("/connexion")
      }
      if (res) {
        setUser(res);
        setToken(res.token);
        localStorage.setItem("site", res.token);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function logOut() : Promise<void> {
    setUser(null)
    setToken('');
    localStorage.removeItem("site");
    navigate('/')
  };

  return (
    <UserContext.Provider value={{ user, setUser, token, userMessage, logIn, logOut}}>{children}</UserContext.Provider>
  );
}
export function useUserContext() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      'useUserContext doit être utilisé dans UserContextProvider'
    );
  }

  return context;
}
