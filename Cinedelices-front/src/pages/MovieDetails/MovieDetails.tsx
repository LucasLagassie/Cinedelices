
import './MovieDetails.scss';
import '../Recipes/Recipes.scss';
import { NavLink } from 'react-router-dom';
import { useRootContext } from '../../routes/Root';
import { useParams } from 'react-router-dom';
import { IMovieSerie } from '../../types/types';
import Page404 from '../404/404';

export default function MovieDetails() {

    const { MovieSerieId } = useParams();
    console.log(MovieSerieId);

    const { moviesSeries }: { moviesSeries: IMovieSerie[]} = useRootContext();

    const movieSerieFound = moviesSeries.find((movieSerie) => movieSerie.id === parseInt(MovieSerieId));

    if(movieSerieFound) {

    return (
        <div className='container'>
            <h1>{movieSerieFound.name}</h1>
            <div className="container-informations">
                <img src={`/MoviesSeries/${movieSerieFound.id}.png`} alt={`image ${movieSerieFound.name} `} />
                <ul className='informations'>
                    <li><span>Réalisateur : </span>{movieSerieFound.director}</li>
                    <li><span>Acteurs principaux : </span>{movieSerieFound.actor}</li>
                    <li><span>Sorti le : </span>{movieSerieFound.release_date}</li>
                     {movieSerieFound.movieAndSerieCategory.map((category) => {
                            return <li key={category.id}><span>Genre : </span>{category.name}</li>;
                     })}
                </ul>
            </div>
            <h2>Synopsis</h2>
            <p className='synopsis'>
                {movieSerieFound.synopsis}
            </p>
            <h2>Recettes associées</h2>
            <div className='second-container-movie'>
                
                <ul className='recipes'>
                    {movieSerieFound.recipes.map((recipe) => {
                        return(
                        <div key={recipe.id}className='card-detail'>
                            <NavLink to={`/Recipes/${recipe.id}`}>
                            <img src={`/Recipes/${recipe.id}.webp`} alt={recipe.name} />
                            <h3>{recipe.name}</h3>
                            </NavLink>
                        </div>
                        )
    })}
                </ul>
            </div>
        </div>
    )
}
else {
    return <Page404 />;
}
}