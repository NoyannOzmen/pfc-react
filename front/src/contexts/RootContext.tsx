import { createContext, useContext, useEffect, useState } from 'react';
import { IAnimal, IEspece, ITag, IAssociation } from '../@types/index';

type RootContextType = {
  animals: IAnimal[];
  species : IEspece[];
  tags: ITag[];
  shelters: IAssociation[]
}

type UserContextProviderProps = {
  children: React.ReactNode;
};

export const RootContext = createContext<RootContextType | null>(null);

export default function RootContextProvider({
  children,
}: UserContextProviderProps) {
  const [animals, setAnimals] = useState<IAnimal[]>([]);
  const [species, setSpecies] = useState<IEspece[]>([]);
  const [tags, setTags] = useState<ITag[]>([]);
  const [shelters, setShelters] = useState<IAssociation[]>([]);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/animaux`);
        const data = await response.json();
        setAnimals(data);
      } catch (error) {
        console.error(error);
      }
    }

    const fetchSpecies = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/especes`);
        const data = await response.json();
        setSpecies(data);
      } catch (error) {
        console.error(error);
      }
    }

    const fetchTags = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/tags`);
        const data = await response.json();
        setTags(data);
      } catch (error) {
        console.error(error);
      }
    }

    const fetchShelters = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/associations`);
        const data = await response.json();
        setShelters(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchSpecies();
    fetchAnimals();
    fetchTags();
    fetchShelters();
  }, []);

  return (
    <RootContext.Provider value={{animals, shelters, tags, species}}>{children}</RootContext.Provider>
  )
}

export function useRootContext() {
  const context = useContext(RootContext);

  if (!context) {
    throw new Error(
      'useRootContext doit être utilisé dans RootContextProvider'
    );
  }

  return context;
}