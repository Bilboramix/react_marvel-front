import "./App.css";
import Header from "./components/Header";
import Comics from "./pages/Comics";

import Character from "./pages/Character";
import Characters from "./pages/Characters";
import Favorites from "./pages/Favorites";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

//TODO - favoris, CSS
//DOC API : https://lereacteur-marvel-api.netlify.app/documentation

const App = () => {
  const [search, setSearch] = useState("");
  const [canSearch, setCanSearch] = useState(false);

  return (
    <Router>
      <Header canSearch={canSearch} setSearch={setSearch} />
      <main>
        <Routes>
          <Route path="/" element={<Characters canSearch={canSearch} setCanSearch={setCanSearch} search={search} />} />
          <Route path="/comics" element={<Comics canSearch={canSearch} setCanSearch={setCanSearch} search={search} />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/character" element={<Character canSearch={canSearch} setCanSearch={setCanSearch} />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
