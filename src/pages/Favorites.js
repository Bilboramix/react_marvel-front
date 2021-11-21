import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Favorites = ({ setCanSearch }) => {
  const navigate = useNavigate();
  const [favChars, setFavChars] = useState();
  const [favComics, setFavComics] = useState();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCanSearch(false);
    if (Cookies.get("fav-char") === undefined && Cookies.get("fav-comic") === undefined) {
      navigate("/");
    } else {
      if (Cookies.get("fav-char")) {
        setFavChars(Cookies.get("fav-char").split(","));
      }
      if (Cookies.get("fav-comic")) {
        setFavComics(Cookies.get("fav-comic").split(","));
      }

      setIsLoading(false);
    }
  }, [setCanSearch, navigate]);

  const deleteFavChar = (fav) => {
    const newCookie = Cookies.get("fav-char").split(",");
    newCookie.splice(newCookie.indexOf(fav), 1);
    Cookies.remove("fav-char");
    Cookies.remove(`${fav}`);
    if (newCookie.length > 0) {
      console.log("pas vide");
      Cookies.set("fav-char", newCookie);
      setFavChars(Cookies.get("fav-char").split(","));
    } else {
      setFavChars();
    }
    if (Cookies.get("fav-char") === undefined && Cookies.get("fav-comic") === undefined) {
      navigate("/");
    }
  };

  const deleteFavComic = (fav) => {
    const newCookie = Cookies.get("fav-comic").split(",");
    newCookie.splice(newCookie.indexOf(fav), 1);
    Cookies.remove("fav-comic");
    Cookies.remove(`${fav}`);
    if (newCookie.length > 0) {
      console.log("pas vide");
      Cookies.set("fav-comic", newCookie);
      setFavComics(Cookies.get("fav-comic").split(","));
    } else {
      setFavComics();
    }
    if (Cookies.get("fav-char") === undefined && Cookies.get("fav-comic") === undefined) {
      navigate("/");
    }
  };

  return isLoading ? (
    <section className="container">Loading</section>
  ) : (
    <section className="container fav-board">
      {favChars && (
        <div className="cardboard">
          <h2>Personnages favoris</h2>
          {favChars.map((fav, index) => {
            return (
              <div key={index} className="card">
                <h3>{fav}</h3>
                <img src={Cookies.get(`${fav}`)} alt={fav} />
                <button
                  onClick={() => {
                    deleteFavChar(fav);
                  }}
                >
                  Retirer des favoris
                </button>
              </div>
            );
          })}
        </div>
      )}

      {favComics && (
        <div className="cardboard">
          <h2>Comics favoris</h2>
          {favComics.map((fav, index) => {
            return (
              <div key={index} className="card">
                <h3>{fav}</h3>
                <img src={Cookies.get(`${fav}`)} alt={fav} />
                <button
                  onClick={() => {
                    deleteFavComic(fav);
                  }}
                >
                  Retirer des favoris
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Favorites;
