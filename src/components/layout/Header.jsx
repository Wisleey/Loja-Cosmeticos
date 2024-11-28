import React, { useContext, useEffect, useState } from "react"; // Importa React e os hooks useContext, useEffect e useState.
import classes from "./Header.module.css"; // Importa o módulo CSS específico para estilização deste componente.
import { ReactComponent as IconCart } from "../../assets/cart.svg"; // Importa o ícone SVG do carrinho.
import { ReactComponent as IconSun } from "../../assets/sun.svg"; // Importa o ícone SVG do sol (modo claro).
import { ReactComponent as IconMoon } from "../../assets/moon.svg"; // Importa o ícone SVG da lua (modo escuro).
import LogoPng from "../../assets/Mesoestetic.png"; // Importa o ícone do logo.
import { CartContext } from "../../context/CartContext"; // Importa o contexto do carrinho.
import { ColorModeContext } from "../../context/ColorModeContext"; // Importa o contexto do modo de cor (claro/escuro).
import SearchField from "./SearchField"; // Importa o componente de campo de pesquisa.

// Componente Header
const Header = ({ onShow }) => {
  // Usa o contexto do carrinho para acessar os itens no carrinho.
  const { itemsCart } = useContext(CartContext);
  
  // Usa o contexto do modo de cor para alternar entre modos claro/escuro.
  const { changeMode, isDarkMode } = useContext(ColorModeContext);
  
  // Estado local para controlar se a página foi rolada.
  const [pageScrolled, setPageScrolled] = useState(false);

  // Calcula o número total de itens no carrinho somando a quantidade de cada item.
  const totalItemsInTheCart = itemsCart.items.reduce((prev, curr) => {
    return prev + curr.amount;
  }, 0);

  // useEffect para detectar quando a página é rolada e alterar o estado `pageScrolled`.
  useEffect(() => {
    const scrollPage = () => {
      if (window.scrollY > 16) {
        setPageScrolled(true); // Define `pageScrolled` como true se a página for rolada mais de 16 pixels.
      } else {
        setPageScrolled(false); // Define `pageScrolled` como false se a página for rolada menos de 16 pixels.
      }
    };

    window.addEventListener("scroll", scrollPage); // Adiciona um listener de evento para detectar a rolagem da página.

    return () => {
      window.removeEventListener("scroll", scrollPage); // Remove o listener de evento ao desmontar o componente.
    };
  }, []); // O array de dependências vazio significa que este efeito só roda uma vez, após o primeiro render.

  return (
    // Renderiza o cabeçalho com classes CSS dinâmicas dependendo do estado `pageScrolled`.
    <header
      className={`${classes.header} ${pageScrolled ? classes.scroll : ""}`}
    >
      {/* Container para organizar o conteúdo do cabeçalho */}
      <div className={`container ${classes.container}`}>
        {/* Substituindo o LogoSvg por uma tag img */}
        <span className={classes.logo}>
          <img src={LogoPng} alt="Logo" />
          
        </span>

        {/* Campo de pesquisa */}
        <SearchField />

        {/* Botão para visualizar o carrinho */}
        <button className={classes.cart} onClick={onShow}>
          <span className={classes.cartTxt}>Seu carrinho</span>
          <span className={classes.amount}>
            <IconCart />
            <span className={classes.value}>{totalItemsInTheCart}</span>
          </span>
        </button>

        {/* Botão para alternar entre modos claro e escuro */}
        <button
          className={classes.btnColorMode}
          onClick={changeMode}
          title={isDarkMode ? "Ativar modo claro" : "Ativar modo escuro"}
        >
          {isDarkMode ? <IconSun /> : <IconMoon />}
        </button>
      </div>
    </header>
  );
};

export default Header; // Exporta o componente `Header` como padrão.
