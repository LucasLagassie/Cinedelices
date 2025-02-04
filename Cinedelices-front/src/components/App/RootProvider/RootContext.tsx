// src/context/RootContext.tsx
import React, { createContext, useContext } from 'react';
import { IRecipe, IMovieSerie, ILoggedUser } from '../../../types/types';

interface IRootContext {
  user: ILoggedUser | null;
  setUser: React.Dispatch<React.SetStateAction<ILoggedUser | null>>;
  recipes: IRecipe[];
  setRecipes: React.Dispatch<React.SetStateAction<IRecipe[]>>;
  moviesSeries: IMovieSerie[];
  setMoviesSeries: React.Dispatch<React.SetStateAction<IMovieSerie[]>>;
}

const RootContext = createContext<IRootContext | undefined>(undefined);

export const useRootContext = () => {
  const context = useContext(RootContext);
  if (!context) {
    throw new Error('useRootContext must be used within a RootProvider');
  }
  return context;
};

export const RootProvider: React.FC<{ value: IRootContext; children: React.ReactNode }> = ({ value, children }) => (
  <RootContext.Provider value={value}>{children}</RootContext.Provider>
);