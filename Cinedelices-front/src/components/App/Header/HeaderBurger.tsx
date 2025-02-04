import React, { useState } from 'react';
import './Header.scss';
import { FaHamburger, FaSignOutAlt } from 'react-icons/fa';
import { ILoggedUser } from '../../../types/types';
import ModalMenu from '../../Modal/ModalMenu';
import { useNavigate } from 'react-router-dom';
import './HeaderBurger.scss'

interface HeaderProps {
    user: ILoggedUser | null
};


export default function HeaderAuth({ user }: HeaderProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    }

    return (
        <>
            <div className="header-menu-modal">
                
                    <button
                        className="btn-menu-burger"
                        type="button"
                        aria-label="menu"
                        onClick={handleOpenModal}
                    >
                        <FaHamburger className="icon-burger" />
                    </button>
                {/* Passer l'état de l'utilisateur à ModalMenu pour gérer l'affichage */}
                <ModalMenu isOpen={isModalOpen} onClose={handleCloseModal} />
            </div>
        </>
    );
}
