import React, { useContext } from "react"; // Importa React e o hook useContext.
import { FilterContext } from "../../../context/FilterContext"; // Importa o contexto FilterContext.
import { ColorModeContext } from "../../../context/ColorModeContext"; // Importa o contexto ColorModeContext.
import { ReactComponent as IconX } from "../../../assets/x.svg"; // Importa o ícone SVG para exclusão de filtros.
import classes from "./FilterTags.module.css"; // Importa o módulo CSS para estilização do componente.

const FilterTags = () => {
  // Usa o contexto FilterContext para acessar os filtros e funções de exclusão.
  const { filter, deleteColor, deleteCategory, deleteInputSearchVal } =
    useContext(FilterContext);

  // Usa o contexto ColorModeContext para determinar o modo de cor atual.
  const { isDarkMode } = useContext(ColorModeContext);

  return (
    <>
      {/* Exibe o filtro de pesquisa, se existir um nome de pesquisa */}
      {filter.name && (
        <p
          className={`${classes.searchName} ${
            isDarkMode ? classes.darkMode : "" // Aplica a classe darkMode se o modo escuro estiver ativado.
          }`}
        >
          <button onClick={deleteInputSearchVal} title="excluir pesquisa">
            <IconX />
          </button>{" "}
          Resultados para "{filter.name}"
        </p>
      )}

      {/* Exibe a lista de filtros aplicados para cores e categorias, se houver algum */}
      {(filter.colors.length !== 0 || filter.categories.length !== 0) && (
        <ul className={classes.filterList}>
          {/* Mapeia e exibe cada cor filtrada */}
          {filter.colors.map((color) => (
            <li key={color}>
              {color}{" "}
              <button
                title={`excluir filtro para a cor ${color}`}
                onClick={() => deleteColor(color)} // Exclui o filtro de cor ao clicar no botão.
              >
                <IconX />
              </button>
            </li>
          ))}

          {/* Mapeia e exibe cada categoria filtrada */}
          {filter.categories.map((category) => (
            <li key={category}>
              {category}{" "}
              <button
                title={`excluir filtro da categoria ${category}`}
                onClick={() => deleteCategory(category)} // Exclui o filtro de categoria ao clicar no botão.
              >
                <IconX />
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default FilterTags; // Exporta o componente FilterTags como padrão.
