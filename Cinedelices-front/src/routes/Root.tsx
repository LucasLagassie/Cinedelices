import { useEffect, useState } from 'react';
import NavBar from '../components/App/Navbar/Navbar';
import Footer from '../components/App/Footer/Footer';
import Header from '../components/App/Header/Header';
import { Outlet, useOutletContext } from 'react-router-dom';
import { IRecipe, IMovieSerie, ILoggedUser, IRootContext, IIngredient, IRecipeCategory } from '../types/types';
import { APIBaseURL } from '../../config';


export function useRootContext() {
    return useOutletContext<IRootContext>()
}

export default function Root() {

    const [recipes, setRecipes] = useState<IRecipe[]>([]);
    const [lastRecipes, setLastRecipes] = useState<IRecipe[]>([]);
    const [moviesSeries, setMoviesSeries] = useState<IMovieSerie[]>([]);
    const [user, setUser] = useState<ILoggedUser | null>(null);
    const [ingredients, setIngredients] = useState<IIngredient[]>([]);
    const [recipeCategory, setRecipeCategory] = useState<IRecipeCategory[]>([]);
    const [profileData, setProfileData] = useState<any>(null);
    
    useEffect(() => {
      
        const fetchRecipes = async () => {
            try{
            const response = await fetch(`${APIBaseURL}/recipes`);
            const newRecipes: IRecipe[] = await response.json();
            setRecipes(newRecipes);
        } catch (error) {
            console.log(error);
        }
        };
        fetchRecipes();

        const fetchLastRecipes = async () => {
            try {
                const response = await fetch(`${APIBaseURL}/recipes/latest`);
                const newLastRecipes: IRecipe[] = await response.json();
                setLastRecipes(newLastRecipes);
            } catch (error) {
                console.log(error);
            }
        };
        fetchLastRecipes();

        const fetchMoviesSeries = async () => {
            try {
            const response = await fetch(`${APIBaseURL}/moviesSeries`);
            const newMoviesSeries: IMovieSerie[] = await response.json();
            setMoviesSeries(newMoviesSeries);
        } catch (error) {
            console.log(error);
        }
        };
        fetchMoviesSeries();

        const fetchIngredients = async () => {
            try {
                const response = await fetch(`${APIBaseURL}/ingredients`);
                const newIngredients: IIngredient[] = await response.json();
                setIngredients(newIngredients);
                
            }catch (error) {
                console.log(error);
            }
        };
        fetchIngredients();

        const fetchRecipeCategory = async () => {
            try {
                const response = await fetch(`${APIBaseURL}/recipeCategory`);
                const newRecipeCategory: IRecipeCategory[] = await response.json();
                setRecipeCategory(newRecipeCategory);
            } catch (error) {
                console.error(error);
            }
        };
        fetchRecipeCategory();
      
      const stockedUser = localStorage.getItem('user');
    if(stockedUser) {
        try {
            const parsedUser = JSON.parse(stockedUser)
            console.log(parsedUser);
            setUser(parsedUser)
        } catch (error) {
            console.error('Error parsing JSON from localstorage', error);
        }
    }

    }, []);

   console.log('movies and series dans le root', moviesSeries);

const contextValue: IRootContext = {
    user,
    setUser,
    recipes, 
    setRecipes, 
    lastRecipes,
    setLastRecipes,
    moviesSeries, 
    setMoviesSeries,
    ingredients,
    setIngredients,
    recipeCategory,
    setRecipeCategory,
    profileData,
    setProfileData
}
   
    return (
        <>
            <Header user={user} recipes={recipes} moviesSeries={moviesSeries} />
            <NavBar />
            <Outlet context={contextValue} />
            <Footer />
        </>
    );
}

