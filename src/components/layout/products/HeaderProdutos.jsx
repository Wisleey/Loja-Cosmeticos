import React from "react"; // Importa React para criar o componente.
import { FaPlane, FaCheckCircle, FaCertificate, FaWhatsapp } from "react-icons/fa"; // Importa os ícones da biblioteca react-icons.
import classes from "./HeaderProdutos.module.css"; // Importa o módulo CSS para estilização do componente.
import ProductsPagination from "./ProductsPagination"; // Importa o componente ProductsPagination para controle de paginação.

const HeaderProdutos = ({ products, itemsPerPage, currPage, setCurrPage }) => {
  // Calcula a exibição dos resultados da pesquisa, mostrando a página atual, o total de páginas e o número total de resultados.
  const results = (
    <p className={classes.results}>
      Página {currPage} de {Math.ceil(products.length / itemsPerPage)} |{" "}
      {products.length} resultados
    </p>
  );

  return (
    <>
      {/* Seção de Informações com Ícones */}
      <div className={classes.infoSection}>
        <div className={classes.infoItem}>
          <FaPlane className={classes.icon} />
          <span>Entregamos para todo Brasil</span>
        </div>
        <div className={classes.infoItem}>
          <FaCheckCircle className={classes.icon} />
          <span>Revendedor 100% autorizado</span>
        </div>
        <div className={classes.infoItem}>
          <FaCertificate className={classes.icon} />
          <span>Produtos 100% originais</span>
        </div>
        <div className={classes.infoItem}>
          <FaWhatsapp className={classes.icon} />
          <span>Help: Precisa de ajuda?</span>
        </div>
      </div>

      {/* Seção de Resultados e Paginação */}
      <div className={classes.divPaginas}>
        <div>{results}</div>
        <ProductsPagination
          products={products}
          itemsPerPage={itemsPerPage}
          setCurrPage={setCurrPage}
          currPage={currPage}
        />
      </div>
    </>
  );
};

export default HeaderProdutos; // Exporta o componente HeaderProdutos como padrão.
