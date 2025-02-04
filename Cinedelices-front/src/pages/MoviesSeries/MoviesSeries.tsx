import React from 'react';
import { useRootContext } from '../../routes/Root';
import { NavLink } from 'react-router-dom';
import './MoviesSeries.scss';

export default function MoviesSeries() {
    
  const { moviesSeries } = useRootContext();

  return (
    <div className="container">
      <header>
        <h1>Films & Séries</h1>
      </header>
      <main className="cards-container">
        {moviesSeries.map((movieSerie) => (
          <article key={movieSerie.id} className="card">
            <NavLink 
              to={`/MoviesSeries/${movieSerie.id}`} 
              aria-label={`Voir les détails de ${movieSerie.name}`}
            >
              <img 
                src={`/MoviesSeries/${movieSerie.id}.webp`} 
                alt={`Affiche de ${movieSerie.name}`} 
                loading="lazy" 
                className="card-image"
              />
              
            </NavLink>
            <h3 className="card-title">{movieSerie.name}</h3>
          </article>
        ))}
      </main>
    </div>
  );
}
