
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import FilterContextProvider from "./context/FilterContext"; 
import CartContextProvider from "./context/CartContext"; 
import ColorModeContextProvider from "./context/ColorModeContext"; 
import AlertContextProvider from "./context/AlertContext"; 
import ProductDetails from "./components/layout/products/ProductDetails"; 


const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
  <React.StrictMode>
    <FilterContextProvider>
      <CartContextProvider>
        <ColorModeContextProvider>
          <AlertContextProvider>
            <Router>
              <Routes>
                {/* Rota principal (Home) */}
                <Route path="/" element={<App />} />
                <Route path="/product/:productName" element={<ProductDetails />} /> 
              </Routes>
            </Router>
          </AlertContextProvider>
        </ColorModeContextProvider>
      </CartContextProvider>
    </FilterContextProvider>
  </React.StrictMode>
);
