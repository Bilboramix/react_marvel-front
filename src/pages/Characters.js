import axios from "axios";
import { useEffect, useState } from "react";
const Characters = () => {
  const defaultUrl = "http://localhost:3001/characters?limit=100";
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState(defaultUrl);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get(url);
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [url, setUrl]);

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <section className="container">
      <div>
        <button>Next</button>
        <button>Prev</button>
        <h2>Liste des personnages de Marvel</h2>
        <ul>
          <li>Résultats par page : {data.limit}</li>
          <li>Nombre de pages : {Math.round(data.count / data.limit)}</li>
          <li>Résultats totaux : {data.count}</li>
        </ul>
        <button
          onClick={() => {
            setUrl("http://localhost:3001/characters?limit=25");
          }}
        >
          25
        </button>
        <button
          onClick={() => {
            setUrl("http://localhost:3001/characters?limit=50");
          }}
        >
          50
        </button>
        <button
          onClick={() => {
            setUrl("http://localhost:3001/characters?limit=100");
          }}
        >
          100
        </button>
      </div>
      {data.results.map((character, index) => {
        return (
          <div>
            <p key={index}>{character.name}</p>
            <img src={character.thumbnail.path + "." + character.thumbnail.extension} alt={character.name} />
          </div>
        );
      })}
    </section>
  );
};

export default Characters;
