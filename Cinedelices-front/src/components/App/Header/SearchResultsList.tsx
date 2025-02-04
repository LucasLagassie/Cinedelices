import React from 'react'
import './SearchResultsList.scss'
import { NavLink } from 'react-router-dom'
import SearchResult from './SearchResult'
import { IRecipe } from '../../../types/types';
import { IMovieSerie } from '../../../types/types';

interface SearchResultsListProps {
  results: IRecipe[] | IMovieSerie[];
  onRecipeClick: () => void;
}

export default function SearchResultsList({ results, onRecipeClick }: SearchResultsListProps) {
  if (results.length === 0) return null; // Masque la liste si aucun résultat
  console.log('resultats dans searchresultlist : ', results);

  return (
    <div className='results-list'>
      {results.map((result, id) => {
        // Déterminer si l'élément est un film ou une recette en vérifiant ses attributs
        const isMovie = (result as IMovieSerie).synopsis !== undefined;

        return (
          <>
            {/* Si c'est un film, redirige vers MoviesSeries */}
            {isMovie ? (
              <NavLink to={`/MoviesSeries/${result.id}`} key={id} onClick={onRecipeClick}>
                <SearchResult result={result} />
              </NavLink>
            ) : (
              // Sinon, c'est une recette, redirige vers Recipes
              <NavLink to={`/Recipes/${result.id}`} key={id} onClick={onRecipeClick}>
                <SearchResult result={result} />
              </NavLink>
            )}
          </>
        )
      })}
    </div>
  )
}
