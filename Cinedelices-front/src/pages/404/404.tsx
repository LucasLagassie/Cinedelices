import React from 'react';
import chefImage from '../../assets/Pictures/404/ChefImage.png';
import '../404/404.scss';
import { NavLink } from 'react-router-dom';

export default function Page404 () {
    
    return (
        <div className="error-page">
          <h2>Oups ! Cette scène semble manquer au scénario.</h2>
          <img src={chefImage} alt="Erreur 404 Chef" />
          <div className='error-page-text'>
          <p>
            La recette que vous cherchez a peut-être été coupée au montage ou n'existe pas. Revenez à la cuisine et trouvez d'autres délices à savourer !
          </p>
          <NavLink to="/">
          <button className="error-button">Retour à la cuisine</button>
          </NavLink>
          </div>
        </div>
      );
    }