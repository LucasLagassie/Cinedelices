import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import './Profile.scss';
import { FaRegEdit } from 'react-icons/fa';
import ModalAddRecipe from '../../components/Modal/ModalAddRecipe';

export default function Profile() {
  const [profileData, setProfileData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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
        const response = await fetch(`http://localhost:3000/profile/${userId}`, {
          method: 'GET',
          credentials: 'include',
        });
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données du profil');
        }

        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error('Erreur', error);
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
    };

    fetchProfileData();
  }, [navigate]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }
  const handleCloseModal = () => {
    setIsModalOpen(false);
  }


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
        <h1 className='username'>Bienvenue {profileData.pseudo}</h1>
      </header>
      <div className="container-profile">
        <div className="manage-container">
          <button><NavLink to='/'>Retourner sur la page d'accueil</NavLink></button>
          <button><NavLink to='/profile'>Profil</NavLink></button>
          <button><NavLink to='/favorites'>Recettes favorites</NavLink></button>
          <button><NavLink to='/my-recipes'>Mes Recettes</NavLink></button> 
        </div>
        <div className="profile-container">
          <div className="profile-picture">
            <img
              src="https://imgs.search.brave.com/xkQzy2erxbjZTXfX1KvGzpfAR3uZcxHzeA621gHIm0k/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9wdWIt/c3RhdGljLmZvdG9y/LmNvbS9hc3NldHMv/cHJvamVjdHMvcGFn/ZXMvMjhkZmRkMWI2/Nzk4NGZkMDk1ZTM2/OGI3YzYwM2I3ZTQv/Zm90b3ItODg4M2Fi/ZGNhMDI4NGQxM2Ey/NTQyZjg4MTBiZjgx/NTYuanBn"
              alt="avatar"
            />
          </div>
          <div className="input-container">
            <div className="profile-pseudo">
              <input type="text" value={profileData.pseudo} readOnly /><FaRegEdit />
            </div>
            <div className="profile-mail">
              <input type="text" value={profileData.email} readOnly /><FaRegEdit />
            </div>
          </div>
          <button onClick={handleOpenModal}>Créer votre recette !</button>
        </div>
      </div>
      {isModalOpen && ( <ModalAddRecipe 
          onClose={handleCloseModal}/>
      )}
          </>

  );
}
      

      