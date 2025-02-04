import  { useState } from 'react';
import Select from 'react-select'
import { useRootContext } from '../../routes/Root';
import './Recipes.scss';
import { NavLink } from 'react-router-dom';


export default function Recipes() {
    const { recipes, moviesSeries } = useRootContext();

    // Initialisation de la catégorie sélectionnée avec un objet de valeur et de label
    const [selectedCategory, setSelectedCategory] = useState({ value: 'All', label: 'Toutes les catégories' });

    // Options de catégories pour le sélecteur
    const categoryOptions = [
        { value: 'All', label: 'Toutes les catégories' },
        { value: 'Entrée', label: 'Entrée' },
        { value: 'Plat', label: 'Plat' },
        { value: 'Dessert', label: 'Dessert' }
    ];

    // Gestionnaire pour le changement de catégorie
    const handleCategoryChange = (selectedOption) => {
        setSelectedCategory(selectedOption);
    };

    // Filtrer les recettes en fonction de la catégorie sélectionnée
    const filteredRecipes = selectedCategory.value === 'All' 
        ? recipes 
        : recipes.filter(recipe => recipe.recipeCategory.name === selectedCategory.value);

    return (
        <div className="container">
            <h1>Recettes</h1>
            <div className="custom-select">
                <label htmlFor="category-select">Filtrer par catégorie : </label>
                <Select
                    className="select-bar"
                    value={selectedCategory}       // Valeur sélectionnée
                    onChange={handleCategoryChange} // Gestion du changement
                    options={categoryOptions}       // Options du select
                    isSearchable={true}             // Permettre la recherche dans les options
                />
            </div>
            <div className="cards-container">
                {filteredRecipes.map((recipe) => {
                    // Trouver le film ou la série correspondant au movieId de la recette
                    const matchingMovie = moviesSeries.find(movie => movie.id === recipe.movieId);

                    // Si aucun film correspondant, sauter cette recette
                    if (!matchingMovie) {
                        return null;
                    }

                    // Extraire le nom du film correspondant
                    const movieName = matchingMovie.name;

                    // Retourner le JSX pour la recette
                    return (
                        <div key={recipe.id} className="card">
                            <NavLink to={`/Recipes/${recipe.id}`}>
                                <img src={`/Recipes/${recipe.id}.webp`} alt={recipe.name} />
                            </NavLink>
                            <div className="manage-names">
                                    <span>{recipe.name}</span>
                                    <NavLink to={`/MoviesSeries/${matchingMovie.id}`}><span>{movieName}</span></NavLink>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
