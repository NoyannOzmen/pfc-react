import { createContext, useContext, useMemo, useState } from 'react';
import { IUtilisateur } from '../@types/index';

type UserContextType = {
  user: IUtilisateur | null;
  setUser: React.Dispatch<React.SetStateAction<IUtilisateur | null>>;
};

type UserContextProviderProps = {
  children: React.ReactNode;
};

export const UserContext = createContext<UserContextType | null>(null);

export default function UserContextProvider({
  children,
}: UserContextProviderProps) {
  const [user, setUser] = useState<IUtilisateur | null>(null);

  const contextValue = useMemo(() => ({ user, setUser }), [user]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
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
