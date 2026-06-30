import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Sucess from "./pages/Sucess/Sucess";
import Home from "./pages/Home/Home";
import Resorts from "./pages/Resorts/Resorts";
import Activities from "./pages/Activities/Activities";
import Cart from "./pages/Cart/Cart";
import Edit from "./Components/Edit/Edit"

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resorts" element={<Resorts />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/sucess" element={<Sucess />}/>
        <Route path="/edit"element={<Edit />}/>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;