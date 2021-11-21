import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

const Character = ({ canSearch, setCanSearch }) => {
  const location = useLocation();
  const characterId = location.search.split("?").pop();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    setCanSearch(false);
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://bilbo-marvel-back.herokuapp.com/character?characterId=${characterId}`);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [characterId, setCanSearch]);

  return isLoading ? (
    <section className="container">Loading...</section>
  ) : (
    <section className="container">
      <div className="char-container">
        <h2>{data.name}</h2>
        <div className="char-details">
          <img src={data.thumbnail.path + "." + data.thumbnail.extension} alt={data.name} />
          {data.description && <p className="char-desc">{data.description}</p>}
        </div>
      </div>

      <div>
        <h2>Comics qui contiennent le personnage {data.name} :</h2>
        <div className="cardboard">
          {data.comics.map((comic, index) => {
            return (
              <div className="card" key={comic._id}>
                <h3>{comic.title}</h3>
                <img src={comic.thumbnail.path + "." + comic.thumbnail.extension} alt={comic.title} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Character;
