import { BrowserRouter, Routes, Route } from "react-router-dom";
import MarketPage from "./pages/Market.js";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="withHeader">
        <Routes>
          <Route index element={<Home />} />
          <Route path="items" element={<MarketPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
