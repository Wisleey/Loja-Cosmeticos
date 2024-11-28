import Header from "./components/layout/Header";
import Products from "./components/layout/products/Products";
import Footer from "./components/layout/Footer";
import Cart from "./components/cart/Cart";
import { useContext, useState } from "react";
import PurchaseSuccess from "./components/cart/finishedPurchase/PurchaseSuccess";
import { ColorModeContext } from "./context/ColorModeContext";
import "./App.css";
import Alert from "./components/alert/Alert";
import { AlertContext } from "./context/AlertContext";



function App() {
  // Estado para controlar a visibilidade do carrinho
  const [isCartVisible, setIsCartVisible] = useState(false);

  // Estado para controlar a visibilidade do modal de compra finalizada
  const [purchaseFinishedModal, setPurchaseFinishedModal] = useState(false);

  // Contextos para o modo de cor e alertas
  const { isDarkMode } = useContext(ColorModeContext);
  const { alertIsShown, alertContent } = useContext(AlertContext);

  // Função para fechar o carrinho
  const closeCartHandler = () => {
    setIsCartVisible(false);
  };

  // Função para abrir o carrinho
  const showCartHandler = () => {
    setIsCartVisible(true);
  };

  // Função para fechar o modal de compra finalizada
  const closeFinalModalHandler = () => {
    setPurchaseFinishedModal(false);
  };

  // Função para abrir o modal de compra finalizada
  const showFinalModalHandler = () => {
    setPurchaseFinishedModal(true);
  };

  return (
    <>
      {/* Componente de alerta exibido quando um alerta está ativo */}
      <Alert alertIsShown={alertIsShown} content={alertContent} />

      {/* Aplicando a classe 'darkMode' se o modo escuro estiver ativado */}
      <div className={`app ${isDarkMode ? "darkMode" : ""}`}>
        {/* Condicionalmente renderiza o carrinho se 'isCartVisible' for verdadeiro */}
        {isCartVisible && (
          <Cart
            onClose={closeCartHandler} // Passa a função para fechar o carrinho
            onShowFinal={showFinalModalHandler} // Passa a função para abrir o modal de compra finalizada
          />
        )}

        {/* Condicionalmente renderiza o modal de compra finalizada se 'purchaseFinishedModal' for verdadeiro */}
        {purchaseFinishedModal && (
          <PurchaseSuccess onClose={closeFinalModalHandler} />
        )}

        {/* Renderiza o cabeçalho com uma função para abrir o carrinho */}
        <Header onShow={showCartHandler} />

        {/* Renderiza a seção de produtos */}
        <Products />

        {/* Renderiza o rodapé */}
        <Footer />
      </div>
    </>
  );
}

export default App;
