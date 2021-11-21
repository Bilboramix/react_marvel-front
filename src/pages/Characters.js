import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Characters = ({ search, canSearch, setCanSearch }) => {
  const [limitQuery, setLimitQuery] = useState(100);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [pagePicker, setPagePicker] = useState(page);

  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setCanSearch(true);
      try {
        setIsLoading(true);
        let url = `http://localhost:3001/characters?limit=${limitQuery}&page=${page}`;
        if (search.length > 0) {
          url = url + `&title=${search}`;
        }
        const response = await axios.get(url);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [limitQuery, page, search, setCanSearch]);

  const handlePagePicker = (e) => {
    e.preventDefault();
    if (pagePicker > Math.round(data.count / data.limit) || pagePicker < 1) {
      alert("Cette page n'existe pas !");
    } else {
      setPage(Number(pagePicker));
    }
  };

  const handleFavorite = (character) => {
    if (Cookies.get("fav-char")) {
      const newCookie = Cookies.get("fav-char").split(",");
      if (newCookie.indexOf(character.name) === -1) {
        newCookie.push(character.name);
      }
      newCookie.toString();
      Cookies.remove("fav-char");
      Cookies.set("fav-char", newCookie);
    } else {
      Cookies.set("fav-char", character.name);
    }

    if (!Cookies.get(`${character.name}`)) {
      const imgUrl = character.thumbnail.path + "." + character.thumbnail.extension;
      Cookies.set(`${character.name}`, imgUrl);
    }

    console.log(character);
  };

  return isLoading ? (
    <section className="container">Loading ...</section>
  ) : (
    <section className="container result-board">
      <h2>Liste des personnages de Marvel</h2>
      <div className="search-board">
        <div className="page-count">
          <label>Résultats totaux : {data.count}</label>
          <label>Nombre de pages : {Math.round(data.count / data.limit)}</label>
        </div>
        <div className="pagination">
          <label>Page actuelle : {page}</label>
          {page < data.count && (
            <button
              onClick={() => {
                setPage(page + 1);
              }}
            >
              Next
            </button>
          )}
          {page > 1 && <button onClick={() => setPage(page - 1)}>Prev</button>}
        </div>
        <div>
          <form onSubmit={handlePagePicker}>
            Aller à la page <input className="page-input" onChange={(e) => setPagePicker(e.target.value)} type="number" name="page" value={pagePicker} /> <button type="submit">Go</button>
          </form>
        </div>

        <div className="pagination">
          <label>Résultats par page : {data.limit}</label>
          <button
            onClick={() => {
              //setUrl("http://localhost:3001/comics?limit=25");
              setLimitQuery(25);
            }}
          >
            25
          </button>
          <button
            onClick={() => {
              //setUrl("http://localhost:3001/comics?limit=50");
              setLimitQuery(50);
            }}
          >
            50
          </button>
          <button
            onClick={() => {
              //setUrl("http://localhost:3001/comics?limit=100");
              setLimitQuery(100);
            }}
          >
            100
          </button>
        </div>
      </div>
      <div className="cardboard">
        {data.results.map((character, index) => {
          return (
            <div className="card" key={character._id}>
              <Link
                to={{
                  pathname: "/character",
                  search: character._id,
                }}
              >
                <h3>{character.name}</h3>
                <img src={character.thumbnail.path + "." + character.thumbnail.extension} alt={character.name} />
              </Link>
              <button
                onClick={() => {
                  handleFavorite(character);
                }}
              >
                Ajouter aux favoris
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Characters;
