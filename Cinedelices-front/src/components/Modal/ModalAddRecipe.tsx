import React, { useState } from 'react';
import { IIngredient, IRecipe, IRecipeCategory, IMovieSerie } from '../../types/types';
import Select from 'react-select';
import './ModalAddRecipe.scss';
import { APIBaseURL } from '../../../config';

interface SelectedIngredient {
  id: number;
  name: string;
  quantity: string;
}

interface ModalAddRecipeProps {
  onClose: () => void;
  recipes: IRecipe[];
  setRecipes: React.Dispatch<React.SetStateAction<IRecipe[]>>;
  ingredients: IIngredient[];
  recipeCategory: IRecipeCategory[];
  moviesSeries: IMovieSerie[];
}

export default function ModalAddRecipe({ onClose, recipes, setRecipes, ingredients, recipeCategory, moviesSeries }: ModalAddRecipeProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [instruction, setInstruction] = useState('');
  const [time, setTime] = useState('');
  const [difficulty, setDifficulty] = useState('facile');
  const [movieAndSerie, setMovieAndSerie] = useState<IMovieSerie | null>(null);
  const [category, setCategory] = useState<IRecipeCategory | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<SelectedIngredient[]>([]);
  const [error, setError] = useState({
    name: '',
    description: '',
    instruction: '',
    time: '',
    ingredients: '',
    recipeCategory: '',
    movieAndSerie: '',
  });

  const user = localStorage.getItem('user');
  const userId = user ? JSON.parse(user).userId : null;

  const validateForm = () => {
    const formErrors = { name: '', description: '', instruction: '', time: '', ingredients: '', recipeCategory: '', movieAndSerie: '' };
    let isValid = true;

    if (!name) {
      formErrors.name = 'Le nom de la recette est requis.';
      isValid = false;
    }
    if (!description) {
      formErrors.description = 'La description est requise.';
      isValid = false;
    }
    if (!instruction) {
      formErrors.instruction = 'Les instructions sont requises.';
      isValid = false;
    }
    if (!time) {
      formErrors.time = 'Le temps de préparation est requis.';
      isValid = false;
    }
    if (selectedIngredients.length === 0) {
      formErrors.ingredients = 'Vous devez ajouter au moins un ingrédient.';
      isValid = false;
    }
    if (!category) {
      formErrors.recipeCategory = 'La catégorie est requise.';
      isValid = false;
    }
    if (!movieAndSerie) {
      formErrors.movieAndSerie = 'Le film ou la série est requis.';
      isValid = false;
    }

    setError(formErrors);
    return isValid;
  };

  const handleIngredientChange = (selectedOptions: any) => {
    const updatedIngredients = selectedOptions
      ? selectedOptions.map((option: any) => ({ id: option.value, name: option.label, quantity: '' }))
      : [];
    setSelectedIngredients(updatedIngredients);
  };

  const handleQuantityChange = (index: number, quantity: string) => {
    const updatedIngredients = [...selectedIngredients];
    updatedIngredients[index].quantity = quantity;
    setSelectedIngredients(updatedIngredients);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      console.error('Veuillez remplir tous les champs requis.');
      return;
    }

    try {
      const response = await fetch(`${APIBaseURL}/admin/recipes`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name,
          description,
          instruction,
          time,
          difficulty,
          userId,
          movieId: movieAndSerie?.id,
          recipeCategoryId: category?.id,
          ingredient: selectedIngredients.map(ing => ({ name: ing.name, id: ing.id, quantity: ing.quantity })),
        }),
      });

      if (!response.ok) throw new Error('Erreur lors de l\'ajout de la recette');

      const newRecipe: IRecipe = await response.json();
       const movieAndSerieData = moviesSeries.find(movie => movie.id === newRecipe.recipe.movieId);

    // Mise à jour de l'état des recettes avec movieAndSerie ajouté
    setRecipes([
      ...recipes,
      { ...newRecipe.recipe, movieAndSerie: movieAndSerieData}, // Ajout de movieAndSerie
    ]);
      onClose();
    } catch (error) {
      console.error('Erreur', error);
    }
  };

  return (
    <div className="modal">
        <div className="modal-Recipe">
          <form onSubmit={(e) => handleSubmit(e)}>
            <h2>Créer une nouvelle recette</h2>
            <label>
              Nom de la recette:
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Nom de la recette"
              />
              {error.name && <p>{error.name}</p>}
            </label>
            <label>
              Description:
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Description de la recette"
              />
              {error.description && <p>{error.description}</p>}
            </label>
            <label>
              Ingrédients:
              <Select
                isMulti
                options={ingredients.map((ing) => ({ label: ing.name, value: ing.id }))}
                onChange={handleIngredientChange}
                placeholder="Sélectionnez les ingrédients"
              />
              {selectedIngredients.map((ing, index) => (
                <div key={ing.id}>
                  <span>{ing.name}</span>
                  <input
                    type="text"
                    placeholder="Quantité"
                    value={ing.quantity}
                    onChange={e => handleQuantityChange(index, e.target.value)}
                  />
                </div>
              ))}
              {error.ingredients && <p>{error.ingredients}</p>}
            </label>
            <label>
              Instructions:
              <textarea
                value={instruction}
                onChange={e => setInstruction(e.target.value)}
                placeholder="Instructions de préparation"
              />
              {error.instruction && <p>{error.instruction}</p>}
            </label>
            <label>
              Temps de préparation:
              <input
                type="text"
                value={time}
                onChange={e => setTime(e.target.value)}
                placeholder="Ex: 30 min"
              />
              {error.time && <p>{error.time}</p>}
            </label>
            <label>
              Difficulté:
              <select
                value={difficulty}
                onChange={e => setDifficulty(e.target.value)}
              >
                <option value="Facile">Facile</option>
                <option value="Moyenne">Moyenne</option>
                <option value="Difficile">Difficile</option>
              </select>
            </label>
            <label>
              Catégorie de la recette:
              <Select
                options={recipeCategory.map(category => ({ label: category.name, value: category.id }))}
                onChange={option => setCategory(recipeCategory.find(cat => cat.id === option?.value) || null)}
                placeholder="Sélectionnez une catégorie"
              />
              {error.recipeCategory && <p>{error.recipeCategory}</p>}
            </label>
            <label>
              Film ou Série associé:
              <Select
                options={moviesSeries.map(movie => ({ label: movie.name, value: movie.id }))}
                onChange={option => setMovieAndSerie(moviesSeries.find(movie => movie.id === option?.value) || null)}
                placeholder="Sélectionnez un film ou une série"
              />
              {error.movieAndSerie && <p>{error.movieAndSerie}</p>}
            </label>
            <div className="modal-actions">
              <button type="button" onClick={onClose}>Annuler</button>
              <button type="submit">Enregistrer</button>
            </div>
          </form>
        </div>
    </div>
  );
}
