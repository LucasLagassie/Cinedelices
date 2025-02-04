import './RecipeDetails.scss';
import '../Recipes/Recipes.scss';
import { NavLink } from 'react-router-dom';
import { IRecipe } from '../../types/types';
import { useParams } from 'react-router-dom';
import Page404 from '../404/404';
import { useRootContext } from '../../routes/Root';

export default function RecipeDetails() {
    const { RecipeId } = useParams();
    const { recipes }: { recipes: IRecipe[] } = useRootContext();

    const recipeFound = recipes.find((recipe) => recipe.id === parseInt(RecipeId ?? '0'));
    console.log('recette trouvée', recipeFound);

    if (recipeFound && recipeFound.movieAndSerie) { // Vérifiez si 'movieAndSerie' est défini
        return (
            <div className='container'>
                <h1>{recipeFound.name}</h1>
                <p className='description'>
                    {recipeFound.description}
                </p>
                <div className='second-container'>
                    <div className="card"><img src={`/Recipes/${recipeFound.id}.webp`} alt={recipeFound.name} /></div>

                    <h2>Inspiré du film : {recipeFound.movieAndSerie.name}</h2>
                    <div className="card">
                        <img src={`/MoviesSeries/${recipeFound.movieAndSerie.id}.webp`} alt={`image ${recipeFound.movieAndSerie.name}`} />
                    </div>
                    <div className='otherRecipesContainer'>
                        <NavLink to={`/MoviesSeries/${recipeFound.movieAndSerie.id}`}>
                            <h3 className='otherRecipes'>
                                Voir d'autres recettes liées à {recipeFound.movieAndSerie.name}
                            </h3>
                        </NavLink>
                    </div>
                </div>
                <div className='ingredientsContainer'>
                    <h3>Liste des ingrédients</h3>
                    <ul className='ingredient-list'>
                        {recipeFound.ingredient.map((ingredient) => {
                            return (
                                <li key={ingredient.id}>
                                    {ingredient.name} : {ingredient.RecipeHasIngredient.quantity}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className='second-container'>
                    <h3>Instructions</h3>
                    <p>
                    {recipeFound.instruction.split('.').map((sentence, index) => (
                        sentence.trim() && (
                        <span key={index}>
                            {index + 1}. {sentence.trim()}.
                            <br />
                        </span>
                        )
                    ))}
                    </p>
                </div>
            </div>
        );
    } else {
        return <Page404 />;
    }
}
