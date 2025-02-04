import React from 'react';
import './ModalMenu.scss';
import Navbar from '../App/Navbar/Navbar';
import HeaderAuth from '../App/Header/HeaderAuth';
import { FaTimes } from 'react-icons/fa'; // Importer l'icône


interface ModalMenuProps {
  isOpen: boolean;
  onClose: () => void;
}


const ModalMenu = ({ isOpen, onClose } : ModalMenuProps) => {
  if (!isOpen) return null; // Si la modale n'est pas ouverte, on ne l'affiche pas

  // Fonction pour gérer le clic sur le background
  const handleOverlayClick = (event: React.MouseEvent) => {
    // Assurez-vous que le clic est bien sur l'overlay et pas sur le contenu de la modal
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        {/* Bouton pour fermer la modale */}
        <button className="modal-close" onClick={onClose}><FaTimes></FaTimes></button>
        
        {/* Navbar à l'intérieur de la modale */}
        
          <Navbar onNavItemClick={onClose} />
          <HeaderAuth />
       
      </div>
    </div>
  );
};

export default ModalMenu;
