import React, { useContext, useEffect, useState } from "react";
import { FilterContext } from "../../../context/FilterContext"; // Importa o contexto que contém os produtos filtrados.
import HeaderProdutos from "./HeaderProdutos"; // Importa o componente que exibe o cabeçalho com informações de paginação.
import classes from "./ProductsList.module.css"; // Importa os estilos específicos para este componente.
import ProductItem from "./ProductItem"; // Importa o componente para exibir um item de produto individual.
import ProductsPagination from "./ProductsPagination"; // Importa o componente para gerenciar a paginação dos produtos.
import FilterTags from "./FilterTags"; // Importa o componente que exibe as tags de filtro aplicadas.

const ProductsList = () => {
  const [currPage, setCurrPage] = useState(1); // Estado para a página atual de exibição dos produtos.
  const itemsPerPage = 12; // Número de produtos exibidos por página.
  const [shownProducts, setShownProducts] = useState([]); // Estado para armazenar os produtos a serem exibidos na página atual.
  const { filteredProducts } = useContext(FilterContext); // Obtém os produtos filtrados do contexto.

  // Atualiza a lista de produtos exibidos com base na página atual e na lista de produtos filtrados.
  useEffect(() => {
    const indexPreviousPage = itemsPerPage * (currPage - 1); // Índice inicial dos produtos para a página atual.
    const indexCurrPage = itemsPerPage * currPage; // Índice final dos produtos para a página atual.
    setShownProducts(filteredProducts.slice(indexPreviousPage, indexCurrPage)); // Define os produtos a serem exibidos na página atual.
  }, [currPage, filteredProducts]); // Dependências: atualiza sempre que a página atual ou os produtos filtrados mudam.

  // Reseta a página atual para 1 sempre que a lista de produtos filtrados mudar.
  useEffect(() => {
    setCurrPage(1); // Reseta a página atual para a primeira página quando os produtos filtrados mudam.
  }, [filteredProducts]);

  // Mapeia a lista de produtos exibidos para o componente ProductItem.
  const productsList = shownProducts.map((prod) => (
    <ProductItem
      key={prod.name} // Usa o nome do produto como chave única para cada item.
      name={prod.name} // Nome do produto.
      price={prod.price} // Preço do produto.
      img={prod.img} // Imagem do produto.
      description={prod.description} // Descrição do produto.
    />
  ));

  return (
    <section className={classes.products}>
      {/* Exibe o cabeçalho com informações de paginação e quantidade total de produtos */}
      <HeaderProdutos
        products={filteredProducts} // Lista completa de produtos filtrados.
        itemsPerPage={itemsPerPage} // Número de produtos por página.
        currPage={currPage} // Página atual.
        setCurrPage={setCurrPage} // Função para atualizar a página atual.
      />
      {/* Exibe as tags de filtro aplicadas */}
      <FilterTags />
      {/* Condicional: se houver produtos filtrados, exibe a lista de produtos e a paginação; caso contrário, exibe uma mensagem de erro. */}
      {filteredProducts.length ? (
        <>
          <ul className={classes.productsList}>{productsList}</ul> {/* Lista os produtos na página atual. */}
          <ProductsPagination
            products={filteredProducts} // Lista completa de produtos filtrados.
            itemsPerPage={itemsPerPage} // Número de produtos por página.
            setCurrPage={setCurrPage} // Função para atualizar a página atual.
            currPage={currPage} // Página atual.
          />
        </>
      ) : (
        <p className={classes.error}>
          Ops, não foi encontrado nenhum resultado para a sua pesquisa.
        </p> // Mensagem exibida quando nenhum produto é encontrado.
      )}
    </section>
  );
};

export default ProductsList;
