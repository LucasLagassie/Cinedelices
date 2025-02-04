import React, { useEffect, useState, FormEvent } from 'react';
import { IIngredient, IRecipe, IRecipeCategory, IMovieSerie } from '../../types/types';
import Select from 'react-select';
import './ModalAddRecipe.scss';
import { APIBaseURL } from '../../../config';

interface ModalEditRecipeProps {
  onClose: () => void;
  recipes: IRecipe[];
  setRecipes: React.Dispatch<React.SetStateAction<IRecipe[]>>;
  ingredients: IIngredient[];
  recipeCategory: IRecipeCategory[];
  moviesSeries: IMovieSerie[];
  recipe: IRecipe | null; // Prop pour la recette à éditer
}

export default function ModalEditRecipe({
  onClose,
  recipes, 
  setRecipes,
  ingredients,
  recipeCategory,
  moviesSeries,
  recipe,
}: ModalEditRecipeProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [instruction, setInstruction] = useState('');
  const [time, setTime] = useState('');
  const [difficulty, setDifficulty] = useState('facile');
  const [movieAndSerie, setMovieAndSerie] = useState<IMovieSerie | null>(null);
  const [category, setCategory] = useState<IRecipeCategory | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<{ ingredient: IIngredient, quantity: string }[]>([]);
  const [error, setError] = useState({
    name: '',
    description: '',
    instruction: '',
    time: '',
    ingredients: '',
    recipeCategory: '',
    movieAndSerie: '',
  });

  useEffect(() => {
    console.log('recipe', recipe);
    if (recipe) {
      setName(recipe.name);
      setDescription(recipe.description);
      setInstruction(recipe.instruction);
      setTime(recipe.time);
      setDifficulty(recipe.difficulty);
  
      // Réinitialisation de l'ingrédient sélectionné avec la recette initiale
      const selectedMovie = moviesSeries.find(movie => movie.id === recipe.movieId);
      setMovieAndSerie(selectedMovie || null);
  
      const selectedCategory = recipeCategory.find(c => c.id === recipe.recipeCategoryId);
      setCategory(selectedCategory || null);
  
      // Initialisation des ingrédients et de leurs quantités
      setSelectedIngredients(
        Array.isArray(recipe.ingredient)
          ? recipe.ingredient.map((ing: any) => {
              const foundIngredient = ingredients.find(i => i.id === ing.id);
              return {
                ingredient: foundIngredient || ing,
                quantity: ing.RecipeHasIngredient.quantity || '',
              };
            })
          : []
      );
    }
  }, [recipe, moviesSeries, recipeCategory, ingredients]);

  const handleIngredientChange = (selectedOptions: any) => {
    const newSelectedIngredients = selectedOptions ? selectedOptions.map((option: any) => {
      // Vérifier si l'ingrédient est déjà sélectionné
      const existingIngredient = selectedIngredients.find(ing => ing.ingredient.id === option.value);
      if (existingIngredient) {
        return existingIngredient; // Ne pas ajouter à nouveau cet ingrédient
      } else {
        // Ajouter l'ingrédient avec une quantité vide
        return {
          ingredient: ingredients.find(ing => ing.id === option.value)!,
          quantity: '', // Quantité vide initiale
        };
      }
    }) : [];
  
    // Mettre à jour l'état des ingrédients sélectionnés
    setSelectedIngredients(newSelectedIngredients);
  };

  const handleQuantityChange = (index: number, value: string) => {
    // Crée une copie de l'état des ingrédients sélectionnés
    const updatedSelectedIngredients = [...selectedIngredients];
    
    // Mettre à jour la quantité de l'ingrédient à l'indice spécifié
    updatedSelectedIngredients[index].quantity = value;
  
    // Mettre à jour l'état avec la nouvelle liste des ingrédients
    setSelectedIngredients(updatedSelectedIngredients);
  };

  const validateForm = () => {
    let formErrors = { name: '', description: '', instruction: '', time: '', ingredients: '', recipeCategory: '', movieAndSerie: '' };
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

  const ingredientOptions = ingredients.map(ing => ({ value: ing.id, label: ing.name }));
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      console.error('Veuillez remplir tous les champs requis.');
      return;
    }

    try {
      const response = await fetch(`${APIBaseURL}/admin/recipes/${recipe?.id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name,
          description,
          ingredient: selectedIngredients.map(ing => ({
            ingredientId: ing.ingredient.id,
            quantity: ing.quantity
          })),
          instruction,
          time,
          difficulty,
          movieId: movieAndSerie?.id,
          recipeCategoryId: category?.id,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la modification de la recette');
      }

      const updatedRecipe: IRecipe = await response.json();
      console.log("Ingrédients mis à jour :", updatedRecipe);

        setRecipes((prevRecipes) =>
          prevRecipes.map((r) =>
        r.id === updatedRecipe.recipe.id
          ? {
              ...r,
              ...updatedRecipe.recipe,
              ingredient: updatedRecipe.recipe.ingredient, // Ajoutez les ingrédients mis à jour
            }
          : r
      )
    );

      onClose();
    } catch (error) {
      console.error('Erreur', error);
    }
  };

  return (
    <div className="modal">
      <div className="overlay">
        <div className="modal-Recipe">
          <form onSubmit={handleSubmit}>
            <h2>Modifier la recette</h2>
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
                options={ingredientOptions}
                onChange={handleIngredientChange}
                value={selectedIngredients.map(ing => ({
                  value: ing.ingredient.id,
                  label: ing.ingredient.name,
                }))}
                placeholder="Sélectionnez les ingrédients"
              />
              {selectedIngredients.map((ing, index) => (
                <div key={ing.ingredient?.id || index} className="ingredient-item">
                  <span>{ing.ingredient.name}</span>
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
              Catégorie:
              <select
                value={category?.id || ''}
                onChange={e => {
                  const selectedCategory = recipeCategory.find(c => c.id === parseInt(e.target.value, 10));
                  setCategory(selectedCategory || null);
                }}
              >
                <option value="">Sélectionner une catégorie</option>
                {recipeCategory.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {error.recipeCategory && <p>{error.recipeCategory}</p>}
            </label>

            <label>
              Film ou Série:
              <select
                value={movieAndSerie?.id || ''}
                onChange={e => {
                  const selectedMovie = moviesSeries.find(movie => movie.id === parseInt(e.target.value, 10));
                  setMovieAndSerie(selectedMovie || null);
                }}
              >
                <option value="">Sélectionner un film ou une série</option>
                {moviesSeries.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
              {error.movieAndSerie && <p>{error.movieAndSerie}</p>}
            </label>
            <button type="submit">Sauvegarder</button>
          </form>
          <button onClick={onClose}>Fermer</button>
        </div>
      </div>
    </div>
  );
}
