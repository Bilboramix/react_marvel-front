import axios from "axios";
import { useEffect, useState } from "react";
const Characters = ({ search }) => {
  const [limitQuery, setLimitQuery] = useState(100);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [pagePicker, setPagePicker] = useState(page);

  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        let url = `http://localhost:3001/characters?limit=${limitQuery}&page=${page}`;
        if (search.length > 0) {
          url = url + `&title=${search}`;
        }
        console.log(url);
        const response = await axios.get(url);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [limitQuery, page, search]);

  const handlePagePicker = (e) => {
    e.preventDefault();
    if (pagePicker > Math.round(data.count / data.limit) || pagePicker < 1) {
      alert("Cette page n'existe pas !");
    } else {
      setPage(Number(pagePicker));
    }
  };

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <section className="container">
      <div>
        <h2>Liste des personnages de Marvel</h2>
        <ul>
          <li>Résultats totaux : {data.count}</li>
          <li>Nombre de pages : {Math.round(data.count / data.limit)}</li>

          <li>Page actuelle : {page}</li>

          <li>
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
          </li>
          <form onSubmit={handlePagePicker}>
            Aller à la page <input onChange={(e) => setPagePicker(e.target.value)} type="number" name="page" value={pagePicker} /> <button type="submit">Go</button>
          </form>
          <li>Résultats par page : {data.limit}</li>
          <li>
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
          </li>
        </ul>
      </div>
      {data.results.map((character, index) => {
        return (
          <div key={character._id}>
            <p>{character.name}</p>
            <img src={character.thumbnail.path + "." + character.thumbnail.extension} alt={character.name} />
          </div>
        );
      })}
    </section>
  );
};

export default Characters;
