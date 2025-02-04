import './HeaderLogo.scss';
import Logo from '../../../assets/logo/logo.png';

export default function HeaderLogo() { 
    return (
        <div className="header-logo">
            <a href="/">
          <img src={Logo} className="logo" alt="CinéDélices Logo" />
        </a>
        </div>
    );
} 