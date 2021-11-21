import Cookies from "js-cookie";

import { useEffect, useState } from "react";

const Favorites = () => {
  const [favChars, setFavChars] = useState();
  const [favComics, setFavComics] = useState();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setFavChars(Cookies.get("fav-char").split(","));
    setFavComics(Cookies.get("fav-comic").split(","));
    setIsLoading(false);
  }, []);
  return isLoading ? (
    <p>Loading</p>
  ) : (
    <section className="container">
      <div>
        <h3>Personnages favoris</h3>
        {favChars.map((fav, index) => {
          return (
            <div>
              <h4>{fav}</h4>
              <img src={Cookies.get(`${fav}`)} alt={fav} />
            </div>
          );
        })}
      </div>

      <div>
        <h3>Comics favoris</h3>
        {favComics.map((fav, index) => {
          return (
            <div>
              <h4>{fav}</h4>
              <img src={Cookies.get(`${fav}`)} alt={fav} />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Favorites;
