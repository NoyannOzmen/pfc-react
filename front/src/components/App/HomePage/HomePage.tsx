import { Link } from 'react-router-dom';
import CarouselOfThree from '../Animals/CarouselOfThree';
import CarouselOfOne from '../Animals/CarouselOfOne';

function HomePage() {
  return (
    <main className="justify-self-stretch flex-1 flex flex-col">
      <section className="flex flex-col h-[80%] bg-right bg-cover bg-unai place-content-center">
      <div className="flex flex-col rounded-2xl bg-texte/35 py-10 m-6 max-w-4xl">
      <h2 className="stroke-title font-grands px-12 text-5xl">Parce que chaque animal a besoin d'un toit...</h2>
      <p className="text-fond p-12 max-w-4xl text-base">Vous aimez les animaux et êtes soucieux de leur bien-être ?<br />Vous souhaitez venir en aide à un refuge proche de vous ?<br />Vous n'êtes pas encore sûrs de pouvoir adopter durablement un animal ?<br />Vous n'avez jamais eu d’animal mais aimeriez bien en avoir un ?</p>
      <div className="px-12">
      <Link to="/devenir-famille-d-accueil" className="text-base rounded-full bg-accents1 hover:bg-accents1-light text-fond font-bold uppercase p-4">Devenez famille d'accueil</Link>
      </div>
      </div>
      </section>
      
      <section className="p-4 block mx-auto">
      <h2 className="font-grands text-3xl text-center my-2">Ils vous attendent de patte ferme !</h2>

        <CarouselOfOne />

        <CarouselOfThree />
      </section>
    </main>
  );
}
  
export default HomePage;