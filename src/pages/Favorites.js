import Cookies from "js-cookie";

import { useEffect, useState } from "react";

const Favorites = ({ setCanSearch }) => {
  const [favChars, setFavChars] = useState();
  const [favComics, setFavComics] = useState();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCanSearch(false);
    setFavChars(Cookies.get("fav-char").split(","));
    setFavComics(Cookies.get("fav-comic").split(","));
    setIsLoading(false);
  }, [setCanSearch]);
  return isLoading ? (
    <section className="container">Loading</section>
  ) : (
    <section className="container fav-board">
      <div className="cardboard">
        <h2>Personnages favoris</h2>
        {favChars.map((fav, index) => {
          return (
            <div className="card">
              <h3>{fav}</h3>
              <img src={Cookies.get(`${fav}`)} alt={fav} />
            </div>
          );
        })}
      </div>

      <div className="cardboard">
        <h2>Comics favoris</h2>
        {favComics.map((fav, index) => {
          return (
            <div className="card">
              <h3>{fav}</h3>
              <img src={Cookies.get(`${fav}`)} alt={fav} />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Favorites;
