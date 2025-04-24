import React, { useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Alert from "../alert/Alert";
import { AlertContext } from "../../context/AlertContext";
import { ColorModeContext } from "../../context/ColorModeContext"; // Importe o contexto

const Layout = ({ children, onShowCart }) => {
  const { alertIsShown, alertContent } = useContext(AlertContext);
  const { isDarkMode } = useContext(ColorModeContext); // Acesse o contexto

  return (
    <>
      {alertIsShown && (
        <Alert alertIsShown={alertIsShown} content={alertContent} />
      )}
      <Header onShow={onShowCart} isDarkMode={isDarkMode} />
      <main>{children}</main>
      <Footer isDarkMode={isDarkMode} /> {/* Passe isDarkMode como prop */}
    </>
  );
};

export default Layout;
