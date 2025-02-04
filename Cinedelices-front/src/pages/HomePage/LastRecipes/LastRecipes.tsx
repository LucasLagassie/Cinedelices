import { useState, useEffect } from "react";
import "./LastRecipes.scss";
import { NavLink } from "react-router-dom";
import { useRootContext } from '../../../routes/Root';
import { IRecipe } from "../../../types/types";

export default function LastRecipes() {
    const { recipes, moviesSeries } = useRootContext();  // Récupérer toutes les recettes et les films/séries depuis le contexte
    const [isLoading, setIsLoading] = useState(true);  // Gère le statut de chargement
    const [latestRecipes, setLatestRecipes] = useState<IRecipe[]>([]);  // Stocke les 6 dernières recettes

    useEffect(() => {
        // On trie les recettes par `createdAt` dans l'ordre décroissant et on prend les 6 premières
        if (recipes.length > 0) {
            const sortedRecipes = [...recipes].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); // Trie par date décroissante
            const top6Recipes = sortedRecipes.slice(0, 6);  // Limite à 6 recettes
            setLatestRecipes(top6Recipes);  // Met à jour l'état avec les 6 dernières recettes
            setIsLoading(false);  // Arrête le chargement une fois que les recettes sont récupérées
        }
    }, [recipes]);  // Cette dépendance garantit que l'effet se déclenche lorsque `recipes` change

    return (
        <section className="container">
            <h1>Vos dernières créations</h1>

            <div className="cards-container">
                {isLoading ? (
                    <p>Chargement des recettes...</p>  // Affiche un message de chargement pendant que les recettes se chargent
                ) : (
                    latestRecipes.length > 0 ? (
                        latestRecipes.map((recipe) => {
                            // Trouver le film ou la série correspondant au `movieId` de la recette
                            const matchingMovie = moviesSeries.find(movie => movie.id === recipe.movieId);

                            // Si aucun film correspondant, passer au suivant
                            if (!matchingMovie) return null;

                            // Extraire le nom du film/série
                            const movieName = matchingMovie.name;

                            // Retourner le JSX pour la recette
                            return (
                                <div key={recipe.id} className="card">
                                    <NavLink aria-label={recipe.name} to={`/Recipes/${recipe.id}`}>
                                        <img src={`/Recipes/${recipe.id}.webp`} aria-label={recipe.name} alt={recipe.name} />
                                    </NavLink>
                                    <div className="manage-names">
                                        <span>{recipe.name}</span>
                                        <NavLink to={`/MoviesSeries/${matchingMovie.id}`}>
                                            <span>{movieName}</span>
                                        </NavLink>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>Aucune recette trouvée...</p>  // Affiche ce message si aucune recette n'est disponible
                    )
                )}
            </div>

            <NavLink to="/recipes">
                <button className="subscribe_button">Toutes les recettes</button>
            </NavLink>
        </section>
    );
}
