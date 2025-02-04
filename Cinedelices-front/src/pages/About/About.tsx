import React from 'react';
import '../About/About.scss';
import About1 from '../../assets/About/About.webp';
import About2 from '../../assets/About/About2.jpg';
import About3 from '../../assets/About/About3.jpg';
import About4 from '../../assets/About/About4.jpg';
import About5 from '../../assets/About/About5.jpg';

export default function About() {
    return (
        <main className="about-page"> {/* Classe parent spécifique */}
            <div className="about">
                <h1>Qu'est-ce que CinéDélices ?</h1>
                
                <section>
                    <div>
                        <h2>Présentation</h2>
                        <p>
                            CinéDélices est un site innovant qui combine deux passions : la cuisine et le cinéma.
                            Notre objectif est de vous proposer des recettes inspirées de vos films et séries préférés.
                            Que vous soyez un fin gourmet ou un amateur de cinéma, vous trouverez ici de quoi ravir vos papilles tout en
                            redécouvrant les plats emblématiques de l’univers cinématographique et des séries.
                        </p>
                    </div>
                    <img src={About1} alt="Presentation Image" />
                </section>
                
                <section>
                    <div>
                        <h2>Notre Mission</h2>
                        <p>
                            Nous souhaitons offrir à nos utilisateurs une expérience immersive où la gastronomie rencontre l'univers du cinéma.
                            Chaque recette est soigneusement sélectionnée et associée à une œuvre pour vous permettre de vous plonger dans un
                            voyage culinaire unique.
                        </p>
                    </div>
                    <img src={About2} alt="Mission Image" />
                </section>

                <section>
                    <div>
                        <h2>Pour Qui ?</h2>
                        <p>
                            CinéDélices s'adresse aux amateurs de cuisine, aux passionnés de cinéma, et à tous les curieux gourmands
                            qui souhaitent découvrir des plats sous un nouvel angle, celui de vos films et séries préférés.
                        </p>
                    </div>
                    <img src={About3} alt="Public Image" />
                </section>

                <section>
                    <div>
                        <h2>Notre Équipe</h2>
                        <p>
                            Ce projet est développé par une équipe d'étudiants en formation chez O'Clock dans le cadre d'un exercice pédagogique.
                            L'organisation suit la méthode agile pour permettre un développement collaboratif et itératif pendant 4 semaines.
                        </p>
                    </div>
                    <img src={About4} alt="Team Image" />
                </section>

                <section>
                    <div>
                        <h2>Pourquoi ce Projet ?</h2>
                        <p>
                            Ce projet a été conçu dans un but pédagogique, visant à obtenir le Titre Professionnel en développement web.
                            Il s'agit d'un exercice complet qui couvre toutes les étapes de la création d'un site, de la conception au déploiement.
                        </p>
                    </div>
                    <img src={About5} alt="Project Image" />
                </section>
            </div>
        </main>
    );
}
