import React, { useContext, useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { all_products } from "../../../lista_produtos";
import "./ProductDetails.css";
import { CartContext } from "../../../context/CartContext";
import { AlertContext } from "../../../context/AlertContext";
import { motion } from "framer-motion";
import { ColorModeContext } from "../../../context/ColorModeContext";
import Cart from "../../cart/Cart";
import Layout from "../Layout";
import PurchaseSuccess from "../../cart/finishedPurchase/PurchaseSuccess";

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

const ProductDetails = () => {
  const [amount, setAmount] = useState(1);
  const animaTimeout = useRef();
  const { addItem } = useContext(CartContext);
  const { showAlert } = useContext(AlertContext);
  const { productName } = useParams();
  const { isDarkMode } = useContext(ColorModeContext);

  const [isCartVisible, setIsCartVisible] = useState(false);
  const [showFinalModal, setShowFinalModal] = useState(false);

  // Aplicar dark mode no body e nos elementos
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("darkMode");
    } else {
      document.body.classList.remove("darkMode");
    }
  }, [isDarkMode]);

  const showCartHandler = () => setIsCartVisible(true);
  const closeCartHandler = () => setIsCartVisible(false);
  const openFinalModalHandler = () => {
    setIsCartVisible(false);
    setShowFinalModal(true);
  };
  const closeFinalModalHandler = () => setShowFinalModal(false);

  const productData = all_products.find(
    (product) => slugify(product.name) === productName
  );

  if (!productData) {
    return (
      <div className={`not-found ${isDarkMode ? "darkMode" : ""}`}>
        Produto não encontrado
      </div>
    );
  }

  const addItemToCartHandler = (e) => {
    e.preventDefault();
    clearTimeout(animaTimeout.current);
    addItem({
      name: productData.name,
      price: productData.price,
      amount: +amount,
      img: productData.img,
    });
    showAlert(`${amount} "${productData.name}" adicionado(s) ao carrinho`);
    setIsCartVisible(true);
  };

  const finalizeDirectlyHandler = () => {
    addItem({
      name: productData.name,
      price: productData.price,
      amount: +amount,
      img: productData.img,
    });
    openFinalModalHandler();
  };

  const orderDetails = `Produto: ${productData.name}
Quantidade: ${amount}
Valor unitário: R$ ${productData.price}
Total: R$ ${(productData.price * amount).toFixed(2)}`;

  return (
    <>
      {isCartVisible && (
        <Cart
          onClose={closeCartHandler}
          onShowFinal={openFinalModalHandler}
          isDarkMode={isDarkMode}
        />
      )}

      {showFinalModal && (
        <PurchaseSuccess
          onClose={closeFinalModalHandler}
          orderDetails={orderDetails}
          isDarkMode={isDarkMode}
        />
      )}

      <Layout onShowCart={showCartHandler} isDarkMode={isDarkMode}>
        <motion.div
          className={`product-details ${isDarkMode ? "darkMode" : ""}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <nav className={`breadcrumbs ${isDarkMode ? "darkMode" : ""}`}>
            <a href="/">Início</a> &gt; <a href="/">Produtos</a> &gt;{" "}
            <span className="product-name">{productData.name}</span>
          </nav>

          <div className="image-container">
            <img
              src={require(`../../../assets/imgs-produtos/${productData.img}`)}
              alt={productData.name}
            />
          </div>

          <motion.div
            className={`info-container ${isDarkMode ? "darkMode" : ""}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="brand-name">{productData.name}</h1>
            <p className="price">R$ {productData.price}</p>

            <div className="product-description">
              <h2>Descrição do Produto</h2>
              <p>{productData.description}</p>
            </div>

            <div className="product-benefits">
              <h2>Benefícios</h2>
              <ul>
                {productData.benefits.map((benefit, index) => (
                  <li key={index}>
                    <span className="benefit-icon">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="product-features">
              <h2>Características</h2>
              <ul className="product-infos">
                <li>🚚 Entrega Expressa para todo o Brasil</li>
                <li>🔒 Compra 100% Segura</li>
                <li>↩️ Garantia de Satisfação</li>
                <li>💊 Produto Original</li>
                <li>👩‍⚕️ Aprovado por Dermatologistas</li>
              </ul>
            </div>

            <div className="buy-options">
              <div className="quantity-selector">
                <label htmlFor="quantity">Quantidade:</label>
                <div className="quantity-controls">
                  <button
                    className={`quantity-btn ${isDarkMode ? "darkMode" : ""}`}
                    onClick={() => setAmount(Math.max(1, amount - 1))}
                  >
                    -
                  </button>
                  <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    value={amount}
                    onChange={(e) =>
                      setAmount(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    min={1}
                    className={isDarkMode ? "darkMode" : ""}
                  />
                  <button
                    className={`quantity-btn ${isDarkMode ? "darkMode" : ""}`}
                    onClick={() => setAmount(amount + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="action-buttons">
                <button
                  className={`btnAdd ${isDarkMode ? "darkMode" : ""}`}
                  onClick={addItemToCartHandler}
                >
                  Adicionar ao Carrinho
                </button>

                <button
                  className={`btnBuyNow ${isDarkMode ? "darkMode" : ""}`}
                  onClick={finalizeDirectlyHandler}
                  title="Comprar agora"
                >
                  Comprar Agora
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Layout>
    </>
  );
};

export default ProductDetails;
