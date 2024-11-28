import React, { createContext, useEffect, useState } from "react";
import { all_products } from "../lista_produtos";

// Cria um contexto para os filtros de produtos
export const FilterContext = createContext();

// Estado inicial dos filtros
const initialFilter = {
  colors: [],
  prices: { min: 0, max: 1000 },
  categories: [],
  name: "",
};

// Provedor de contexto para os filtros
const FilterContextProvider = ({ children }) => {
  // Estado para armazenar os filtros aplicados
  const [filter, setFilter] = useState(initialFilter);

  // Estado para armazenar os produtos filtrados
  const [filteredProducts, setFilteredProducts] = useState(all_products);

  // Função para salvar um novo filtro
  const saveFilter = (newFilter) => {
    setFilter((currVal) => ({ ...newFilter, name: currVal.name }));
  };

  // Função para salvar o valor de pesquisa do input
  const saveInputSearchVal = (name) => {
    setFilter((currVal) => ({ ...currVal, name }));
  };

  // Função para deletar o valor de pesquisa do input
  const deleteInputSearchVal = () => {
    setFilter((currVal) => ({ ...currVal, name: "" }));
  };

  // Função para deletar um filtro específico (cor ou categoria)
  const deleteFilter = (valToDelete, filterName) => {
    setFilter((currVal) => {
      const newArray = currVal[filterName].filter((val) => val !== valToDelete);
      return { ...currVal, [filterName]: [...newArray] };
    });
  };

  // Função para deletar uma cor específica do filtro
  const deleteColor = (colorToDelete) => {
    deleteFilter(colorToDelete, "colors");
  };

  // Função para deletar uma categoria específica do filtro
  const deleteCategory = (categoryToDelete) => {
    deleteFilter(categoryToDelete, "categories");
  };

  // Efeito para aplicar os filtros aos produtos
  useEffect(() => {
    let newFilter = all_products;

    // Filtrar por cor
    newFilter = newFilter.filter((prod) => {
      if (filter.colors.length === 0) return true;
      return filter.colors.indexOf(prod.color) >= 0;
    });

    // Filtrar por categoria
    newFilter = newFilter.filter((prod) => {
      if (filter.categories.length === 0) return true;
      return filter.categories.indexOf(prod.category) >= 0;
    });

    // Filtrar por nome
    newFilter = newFilter.filter((prod) => {
      const prodNames = prod.name.split(" ");
      const productNameHasSearchValue = prodNames.some((name) => {
        return name.toLowerCase().startsWith(filter.name);
      });
      return productNameHasSearchValue;
    });

    // Filtrar por preço
    newFilter = newFilter.filter((prod) => {
      return (
        prod.price >= +filter.prices?.min && prod.price <= +filter.prices?.max
      );
    });

    // Atualiza a lista de produtos filtrados
    setFilteredProducts(newFilter);
  }, [
    filter.categories,
    filter.colors,
    filter.prices.max,
    filter.prices.min,
    filter.name,
  ]);

  return (
    // Provedor do contexto com valores e funções relacionadas aos filtros
    <FilterContext.Provider
      value={{
        saveFilter,
        saveInputSearchVal,
        deleteInputSearchVal,
        deleteColor,
        deleteCategory,
        filteredProducts,
        initialFilter,
        filter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContextProvider;
