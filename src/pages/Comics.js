import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
const Comics = ({ search, canSearch, setCanSearch }) => {
  const [limitQuery, setLimitQuery] = useState(100);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [pagePicker, setPagePicker] = useState(page);

  const [data, setData] = useState();

  useEffect(() => {
    setCanSearch(true);
    const fetchData = async () => {
      try {
        setIsLoading(true);
        let url = `https://bilbo-marvel-back.herokuapp.com/comics?limit=${limitQuery}&page=${page}`;
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

  const handleFavorite = (comic) => {
    if (Cookies.get("fav-comic")) {
      const newCookie = Cookies.get("fav-comic").split(",");
      if (newCookie.indexOf(comic.title) === -1) {
        newCookie.push(comic.title);
      }
      newCookie.toString();
      Cookies.remove("fav-comic");
      Cookies.set("fav-comic", newCookie);
    } else {
      Cookies.set("fav-comic", comic.title);
    }

    if (!Cookies.get(`${comic.title}`)) {
      const imgUrl = comic.thumbnail.path + "." + comic.thumbnail.extension;
      Cookies.set(`${comic.title}`, imgUrl);
    }

    console.log(comic);
  };

  return isLoading ? (
    <section className="container">Loading ...</section>
  ) : (
    <section className="container result-board">
      <h2>Liste des Comics de Marvel</h2>
      <div className="search-board">
        <div className="page-count">
          <label>Résultats totaux : {data.count}</label>
          <label>Nombre de pages : {Math.round(data.count / data.limit)}</label>
        </div>
        <div className="pagination">
          <label>Page actuelle : {page}</label>
          {page < Math.round(data.count / data.limit) && (
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
              setLimitQuery(25);
            }}
          >
            25
          </button>
          <button
            onClick={() => {
              setLimitQuery(50);
            }}
          >
            50
          </button>
          <button
            onClick={() => {
              setLimitQuery(100);
            }}
          >
            100
          </button>
        </div>
      </div>
      <div className="cardboard">
        {data.results.map((comic, index) => {
          return (
            <div className="card" key={comic._id}>
              <h3>{comic.title}</h3>
              <img src={comic.thumbnail.path + "." + comic.thumbnail.extension} alt={comic.title} />
              <button
                onClick={() => {
                  handleFavorite(comic);
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

export default Comics;
