import React from "react";
import classes from "./ProductsPagination.module.css";
import { ReactComponent as ArrowLeft } from "../../../assets/arrow-left.svg";
import { ReactComponent as ArrowRight } from "../../../assets/arrow-right.svg";

const ProductsPagination = ({
  products,
  itemsPerPage,
  currPage,
  setCurrPage,
}) => {
  // Calcula o número total de páginas com base no total de produtos e itens por página.
  const totalPages = Math.ceil(products.length / itemsPerPage);
  
  // Cria um array de números de páginas para renderizar os botões de paginação.
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  // Manipulador de clique para selecionar a página ao clicar no número da página.
  const handleClickNumber = (e) => {
    setCurrPage(e.currentTarget.innerText); // Atualiza a página atual com o número da página clicada.
    window.scrollTo({ top: 0, behavior: "smooth" }); // Rolagem suave para o topo da página.
  };

  // Manipulador de clique para navegar para a página anterior ou próxima.
  const handleClickPage = (pageValue) => {
    if (pageValue < 1 || pageValue > totalPages) {
      return; // Impede a navegação para páginas fora do intervalo.
    }
    setCurrPage(pageValue); // Atualiza a página atual com o valor da página desejada.
    window.scrollTo({ top: 0, behavior: "smooth" }); // Rolagem suave para o topo da página.
  };

  return (
    <>
      {/* Renderiza a navegação de paginação apenas se houver mais de uma página */}
      {pages.length > 1 && (
        <nav className={classes.nav}>
          {/* Botão para página anterior */}
          <button
            onClick={() => handleClickPage(+currPage - 1)}
            title="página anterior"
            disabled={currPage <= 1} // Desativa o botão se estiver na primeira página.
          >
            <ArrowLeft />
          </button>
          {/* Botões para cada número de página */}
          {pages.map((pag) => (
            <button
              key={pag}
              onClick={handleClickNumber}
              className={`${classes.pagNumber} ${
                +pag === +currPage ? classes.currPage : ""
              }`}
              title={`Página ${pag}`}
            >
              {pag}
            </button>
          ))}
          {/* Botão para próxima página */}
          <button
            onClick={() => handleClickPage(+currPage + 1)}
            title="próxima página"
            disabled={currPage >= totalPages} // Desativa o botão se estiver na última página.
          >
            <ArrowRight />
          </button>
        </nav>
      )}
    </>
  );
};

export default ProductsPagination;
