
import "./Slogan.scss";
import { NavLink } from "react-router-dom";

export default function Slogan() {
    
    return (
        <div className="slogan">
                <h1><span>Le goût du cinéma à chaque bouchée...</span> <span>Faites mijoter vos films préférés.</span></h1>
                <h2>Plongez dans un <strong>festin cinématographique</strong>, où chaque film et série est une invitation à savourer des délices inspirés de l'écran.</h2>
            <NavLink to="/register">
            <button className="subscribe_button"><a href="/register">S'inscrire</a></button>
            </NavLink>
        </div>
    );
  };