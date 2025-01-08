import { useEffect, useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';

import Footer from '../components/App/Footer/Footer';
import Header from '../components/App/Header/Header';

/* import { ICategory, IProduct, LoggedUser, RootContext } from '../@types'; */

function Root() {
/*   const [cartProducts, setCartProducts] = useState<number[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [user, setUser] = useState<LoggedUser | null>(null);

  const addProductIdToCart = (id: number) => {
    setCartProducts([...cartProducts, id]);
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/products?_expand=tag&_expand=category`
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        // ici j'ai fini de charger que j'ai un résultat ou une erreur…
        setIsLoadingProducts(false);
      }
    }

    async function fetchCategories() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/categories`
        );
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (cartProducts.length) {
      document.title = `Omazon (panier: ${cartProducts.length} ${
        cartProducts.length > 1 ? 'produits' : 'produit'
      })`;
    } else {
      document.title = 'Omazon';
    }
  }, [cartProducts]); */

  return (
    <div className="app">
      <Header />

      <Outlet />

      <Footer />
    </div>
  );
}

export default Root;
