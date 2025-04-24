// ProductItem.jsx
import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom"; // Importa Link para navegação.
import { AlertContext } from "../../../context/AlertContext";
import { CartContext } from "../../../context/CartContext";
import classes from "./ProductItem.module.css";

const ProductItem = ({ name, img, price, description }) => {
  const [amount, setAmount] = useState(1);
  const animaTimeout = useRef();
  const { addItem } = useContext(CartContext);
  const { showAlert } = useContext(AlertContext);
  const slugify = (text) =>
    text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  const addItemToCartHandler = (e) => {
    e.preventDefault();
    clearTimeout(animaTimeout.current);
    addItem({
      name: name,
      price: price,
      amount: +amount,
      img: img,
    });
    showAlert(`${amount} "${name}" adicionado(s) ao carrinho`);
  };

  return (
    <li className={classes.card}>
      <div className={classes.imgContainer}>
        <Link to={`/product/${slugify(name)}`}>
          <img
            src={require(`../../../assets/imgs-produtos/${img}`)}
            alt={name}
          />
        </Link>
      </div>
      <div className={classes.infos}>
        <div>
          <Link to={`/product/${slugify(name)}`}>
            <p className={classes.name}>{name}</p>
          </Link>
          <p className={classes.description} title={description}>
            {description}
          </p>
        </div>
        <div className={classes.flex}>
          <p className={classes.price}>R$ {price}</p>
          <form className={classes.amountForm}>
            <label>
              <span>amount</span>
              <input
                type="number"
                name="amount"
                id={`amount-${name}`}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                step="1"
                min="1"
              />
            </label>
            <button
              className={classes.btnAdd}
              onClick={addItemToCartHandler}
              title="adicionar ao carrinho"
            >
              +
            </button>
          </form>
        </div>
      </div>
    </li>
  );
};

export default ProductItem;
