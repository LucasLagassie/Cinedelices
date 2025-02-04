
import './ModalDeleteRecipe.scss';
interface ModalDeleteRecipeProps {
    onClose: () => void;
    onDelete:(recipeId: number | string) => void;
    recipeId: number | string;
    recipeName: string;
}
export default function modalDeleteRecipe({onClose, onDelete, recipeName, recipeId}: ModalDeleteRecipeProps) {
    return (
         
            <div className="modal">
                <div className="overlay">
                    <div className="modal-delete">
                        <p>Etes-vous sûr de supprimer la recette : {recipeName} ?</p>
                        <button onClick={() => onDelete(recipeId)}>Oui</button>
                        <button className="cancel-button" onClick={onClose}>Annuler</button>
                    </div>
                </div>
            </div>
        );
    }


