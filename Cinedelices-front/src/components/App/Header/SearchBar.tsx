import React, { useState } from 'react';
import './SearchBar.scss';
import { FaSearch } from 'react-icons/fa';
import { IRecipe } from '../../../types/types';
import { IMovieSerie } from '../../../types/types';


interface SearchBarProps {
    recipes: IRecipe[]
    moviesSeries: IMovieSerie[]
    setResults: React.Dispatch<React.SetStateAction<(IRecipe | IMovieSerie)[]>>
};

export default function SearchBar({ recipes,  setResults, moviesSeries }: SearchBarProps) {

    const [input, setInput] = useState('');

    console.log('recipes dans sarchbar', recipes);
    console.log('moviesSeries dans searchbar', moviesSeries);

   const handleChange = (value: any) => {
    setInput(value);
    const filteredRecipes = recipes?.filter((recipe) => {
        return value && recipe && recipe.name && recipe.name.toLowerCase().includes(value.toLowerCase());
    }) ?? [];

    

    const filteredMoviesSeries = moviesSeries?.filter((movieSerie) => {
        return value && movieSerie && movieSerie.name && movieSerie.name.toLowerCase().includes(value.toLowerCase());
    }) ?? [];

    const filteredMoviesSeriesAndRecipes = [...filteredRecipes, ...filteredMoviesSeries];

    setResults(filteredMoviesSeriesAndRecipes);
};
    return (
            
     <div className="header-form">
        <input
            type="search"
            placeholder="Rechercher..."
            aria-label="Recherche CinéDélices"
            className="search-input"
            value={input}
            onChange={(e) => handleChange(e.target.value)}
        />
        <button className="btn-search" type="submit" aria-label="Rechercher">
            <FaSearch className="icon-search" />
        </button>
    </div>
    );
}