import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import './Register.scss';

export default function Register() {
    const [formData, setFormData] = useState({
        pseudo: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validation des champs
        if (!formData.pseudo || !formData.email || !formData.password || !formData.confirmPassword) {
            setErrorMessage("Tous les champs doivent être remplis.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setErrorMessage("Le mot de passe et la confirmation doivent correspondre.");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pseudo: formData.pseudo,
                    email: formData.email,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword,
                }),
            });
            const data = await response.json();

            if (!response.ok) {
                setErrorMessage(`Erreur lors de l'inscription : ${data.message}`);
                return;
            }

            alert(`Inscription réussie ! Bienvenue ${data.user.pseudo}`);
            navigate('/login');

        } catch (error) {
            setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
        }
    };
    if(isRegistered) {
      return <Navigate to ="/" replace />;
  }
    return (
        
        <div>
          <h2>Créer un compte</h2>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <form className="form-wrapper" onSubmit={handleSubmit}>
            <fieldset>
              <legend>Informations d'inscription</legend>
      
              <div className="input-group">
                <label htmlFor="pseudo">Pseudo</label>
                <input
                  type="text"
                  id="pseudo"
                  name="pseudo"
                  value={formData.pseudo}
                  onChange={handleInputChange}
                  required
                />
              </div>
      
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
      
              <div className="input-group">
                <label htmlFor="password">Mot de passe</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
      
              <div className="input-group">
                <label htmlFor="confirmPassword">Confirmez votre mot de passe</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
      
              <button type="submit">S'inscrire</button>
            </fieldset>
          </form>
        </div>
      );
    }
      