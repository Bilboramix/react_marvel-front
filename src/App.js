import "./App.css";
import Header from "./components/Header";
import Comics from "./pages/Comics";

import Characters from "./pages/Characters";
import Favorites from "./pages/Favorites";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//TODO - Pagination, recherche, favoris, CSS

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Characters />} />
          <Route path="/comics" element={<Comics />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
