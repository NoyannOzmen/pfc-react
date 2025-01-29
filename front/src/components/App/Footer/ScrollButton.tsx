import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ScrollButton = () => {

    const [visible, setVisible] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        const toggleVisible = () => {
            const scrolled = document.documentElement.scrollTop;
            if (scrolled > 150) {
                setVisible(true);
            } else if (scrolled <= 150) {
                setVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisible);
    }, []);

    return (
        <div className="flex-none" onClick={scrollToTop}
        style={{ display: visible ? "inline" : "none" }}>
        <Link className="to-top mb-12 mr-1 flex flex-col text-xs font-bold text-accents1-light opacity-75" to="#top">
          <img className="size-8 place-self-center" src="/icons/top.svg" alt="icone de retour vers le haut" />
          <p className="to-top-text text-center">Haut<br />de page</p>
        </Link>
      </div>
    );
};

export default ScrollButton;