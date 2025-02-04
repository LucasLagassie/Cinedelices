import React from 'react';
import './HomePage.scss';
import Slider from '../HomePage/Slider/Slider';
import Slogan from '../HomePage/Slogan/Slogan';
import LastRecipes from '../HomePage/LastRecipes/LastRecipes';

export default function HomePage() {

const user = localStorage.getItem('user');
const parsedUser = user ? JSON.parse(user) : null;

    return (

        <main>
            {user &&(
            <div className="welcome-message">Bienvenue sur ton compte Cinédélices {parsedUser.userPseudo}</div> 
            )}         
            <section className="landing_page">
                {/* Slides*/}
                <Slider />
                <Slogan />
                

            </section>

                <LastRecipes />
        </main>
    );
}
