import { useEffect, useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';

import Footer from '../components/App/Footer/Footer';
import Header from '../components/App/Header/Header';

import { IAnimal, IEspece, ITag, IAssociation, RootContext } from '../@types';

function Root() {
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
    <div className="app">
        <Header />
        <Outlet
          context={
            {
              animals,
              species,
              shelters,
              tags,
              /* user, */
            } satisfies RootContext
          }
        />
        <Footer />
    </div>
  );
}

export default Root;

export function useRootContext() {
  return useOutletContext<RootContext>();
}
