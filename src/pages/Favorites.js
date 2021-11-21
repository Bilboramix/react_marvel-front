import Cookies from "js-cookie";
import axios from "axios";
import { useEffect, useState } from "react";

const Favorites = () => {
  const [favChar, setFavChar] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    /* const favCharName = Cookies.get("fav-char").split(",");
    console.log(favCharName);
    const processTab = [];
    const fetchData = async () => {
      const sleep = (ms) => {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
      };

      for (let i = 0; i < favCharId.length; i++) {
        const response = await axios.get(`http://localhost:3001/character?characterId=${favCharId[i]}`);
        console.log("Response ========> ", response);
        sleep(5000).then(processTab.push(response.data));
      }
      setFavChar([...processTab]);
    };
    fetchData();
    console.log("FIN DU USE-EFFECT ======> ", favChar); */

    setFavChar(Cookies.get("fav-char").split(","));
    setIsLoading(false);
  }, []);
  return isLoading ? (
    <p>Loading</p>
  ) : (
    <section className="container">
      {favChar.map((fav, index) => {
        return (
          <div>
            <h3>{fav}</h3>
            <img src={Cookies.get(`${fav}`)} alt={fav} />
          </div>
        );
      })}
    </section>
  );
};

export default Favorites;
