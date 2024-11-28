import React from "react"; // Importa React.
import Filter from "../../filter/Filter"; // Importa o componente de filtro.
import classes from "./Products.module.css"; // Importa o módulo CSS para estilização.
import ProductsList from "./ProductsList"; // Importa o componente de lista de produtos.

const Products = () => {
  return (
    <div className="container">
      <main className={classes.main}>
        <p className={classes.navCatalogo}></p> {/* Navegação do catálogo */}
        <Filter /> {/* Componente de filtro para a lista de produtos */}
        <ProductsList /> {/* Lista de produtos exibidos */}
      </main>
    </div>
  );
};

export default Products; // Exporta o componente Products.
