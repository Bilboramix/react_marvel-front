import logo from "../assets/logo-marvel.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav className="container">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <Link to="/">Personnages</Link>
        <Link to="/comics">Comics</Link>
        <Link to="/favorites">Favoris</Link>
      </nav>
    </header>
  );
};

export default Header;
