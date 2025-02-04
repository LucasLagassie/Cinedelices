
import Slider from "react-slick"; // Assure-toi que react-slick est bien importé
import "./Slider.scss";

// Importation des images utilisées dans le carrousel
import Photo1 from '../../../assets/Pictures/Recipes/caroussel1.webp';
import Photo2 from '../../../assets/Pictures/Recipes/caroussel2.webp';
import Photo3 from '../../../assets/Pictures/Recipes/caroussel3.webp';

// Renommage de la fonction Slider en ImageSlider
export default function ImageSlider() {
  // Configuration du carrousel
  const settings = {
      dots: true, // Affiche les points de navigation
      infinite: true, // Boucle infinie
      speed: 1000, // Vitesse de transition
      slidesToShow: 1, // Nombre de slides visibles à la fois
      slidesToScroll: 1, // Nombre de slides à faire défiler à chaque clic
      nextArrow: <div className="slick-arrow slick-next">❯</div>,
      prevArrow: <div className="slick-arrow slick-prev">❮</div>,
      autoplay: true,
      autosplaySpeed: 2000
  };

  return (
      
              <Slider {...settings}>
                  <div>
                      <img src={Photo1} aria-label="Tarte cerise au chocolat" alt=" Tarte cerise au chocolat" className="w-full object-cover" />
                  </div>
                  <div>
                      <img src={Photo2} aria-label=" Soupe à l'oignon du Chapelier Fou" alt=" Soupe à l'oignon du Chapelier Fou" className="w-full object-cover" />
                  </div>
                  <div>
                      <img src={Photo3} aria-label="Poulet sauce piment et chocolat" alt="Poulet sauce piment et chocolat" className="w-full object-cover" />
                  </div>
              </Slider>
  );
}
