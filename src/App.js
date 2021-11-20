import "./App.css";
import Header from "./components/Header";
import Comics from "./pages/Comics";
import { useState } from "react";
import Characters from "./pages/Characters";
import Favorites from "./pages/Favorites";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//TODO - recherche, favoris, CSS
//DOC API : https://lereacteur-marvel-api.netlify.app/documentation

const App = () => {
  const [search, setSearch] = useState("");

  return (
    <Router>
      <Header setSearch={setSearch} />
      <main>
        <Routes>
          <Route path="/" element={<Characters search={search} />} />
          <Route path="/comics" element={<Comics search={search} />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
