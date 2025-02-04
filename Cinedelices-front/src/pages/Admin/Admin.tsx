import React, {useEffect, useState} from 'react';
import '../Profile/Profile.scss';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { useRootContext } from '../../routes/Root';
import {APIBaseURL} from "../../../config";

export default function Admin() {
  const [profileData, setProfileData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const {recipes, setRecipes, ingredients, recipeCategory, moviesSeries} = useRootContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        navigate('/login');
        return;
      }
      const user = JSON.parse(storedUser);
      const userId = user.userId;

      try {
        const response = await fetch(`${APIBaseURL}/admin/${userId}`, {
          method: 'GET',
          credentials: 'include',
        });
        console.log('Fetch Checked')
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données du profil');
        }

        const data = await response.json();
        console.log('Profile data received:', data);
        setProfileData(data);
      } catch (error) {
        console.error('Erreur', error);
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
    };

    fetchProfileData();
  }, [navigate]);


  if (error) {
    return (
      <div className='error-message'>
        <p>{error}</p>
        <NavLink to='/login'>Retourner à la page de connexion</NavLink>
      </div>
    );
  }

  if (!profileData) {
    return <p>Chargement...</p>;
  }


    return (
        <>
        <header className='header-profile'>
        <h1 className='username'>Bienvenue Administrateurs</h1>
        </header>
        
        <div className="container-profile">
          <div className="manage-container">
            <button><NavLink to ='/'>Retourner sur la page d'accueil</NavLink></button>
            <button><NavLink to ='/Admin/ManageUsers'>Gestion des utilisateurs</NavLink></button>
            <button> <NavLink to ='/Admin/ManageRecipes'>Gestion des Recettes</NavLink></button>
            
          </div>
          <div className="profile-container">
           
          <Outlet context={{recipes, setRecipes, ingredients, recipeCategory, profileData, moviesSeries}}/>
            
          </div>
        </div>
        </>
    )
}





