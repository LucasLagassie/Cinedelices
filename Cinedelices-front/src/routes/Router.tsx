import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import HomePage from '../pages/HomePage/HomePage';
import MoviesSeries from '../pages/MoviesSeries/MoviesSeries';
import Recipes from '../pages/Recipes/Recipes';
import LegalNotice from '../pages/LegalNotice/LegalNotice';
import Profile from '../pages/Profile/Profile';
import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import MovieDetails from '../pages/MovieDetails/MovieDetails';
import Page404 from '../pages/404/404';
import RecipeDetails from '../pages/RecipeDetails/RecipeDetails';
import Admin from '../pages/Admin/Admin';
import PrivateRoute from './PrivateRoute';
import ManageRecipes from '../pages/Admin/ManageRecipes';
import ManageUsers from '../pages/Admin/ManageUsers';

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/404',
        element: <Page404 />,
      },
      {
        path: '/MoviesSeries',
        element: <MoviesSeries />,
      },
      {
        path: '/MoviesSeries/:MovieSerieId',
        element: <MovieDetails />,
      },
      {
        path: '/Recipes',
        element: <Recipes />,
      },
      {
        path: '/Recipes/:RecipeId',
        element: <RecipeDetails />,
      },
      {
        path: '/LegalNotice',
        element: <LegalNotice />,
      },
      {
        path: '/About',
        element: <About />,
      },
      {
        path: '/Contact',
        element: <Contact />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/Profile',
        element: <PrivateRoute requiredRole="user"><Profile /></PrivateRoute>,
      },
      {
        path: '/Admin',
        element: <PrivateRoute requiredRole="admin"><Admin /></PrivateRoute>,
        children: [
          {
            path: 'ManageUsers',
            element: <ManageUsers />,
          },
          {
            path: 'ManageRecipes',
            element: <ManageRecipes />,
          },
          
        ],
      },
      {
        path: '*',
        element: <Page404 />,
      },
    ],
  },
]);

export default router;