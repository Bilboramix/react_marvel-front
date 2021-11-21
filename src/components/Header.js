import logo from "../assets/logo-marvel.png";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = ({ setSearch, canSearch }) => {
  const [input, setInput] = useState();
  return (
    <header>
      <nav className="container">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <Link to="/">Personnages</Link>
        <Link to="/comics">Comics</Link>
        <Link to="/favorites">Favoris</Link>

        {canSearch === true && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSearch(input);
            }}
          >
            <span>Rechercher par nom : </span>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
            <button type="submit">Go</button>
          </form>
        )}
      </nav>
    </header>
  );
};

export default Header;
