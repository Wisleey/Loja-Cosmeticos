import React, { useContext } from "react"; // Importa React e o hook useContext.
import classes from "./SearchField.module.css"; // Importa o módulo CSS específico para estilização deste componente.
import { ReactComponent as IconSearch } from "../../assets/search.svg"; // Importa o ícone SVG da pesquisa.
import WrapperButton from "../utilities/WrapperButton"; // Importa o componente de botão customizado.
import { FilterContext } from "../../context/FilterContext"; // Importa o contexto de filtro.

// Componente SearchField
const SearchField = () => {
  // Usa o contexto FilterContext para acessar a função saveInputSearchVal.
  const { saveInputSearchVal } = useContext(FilterContext);

  // Função para lidar com a submissão do formulário de pesquisa.
  const searchHandler = (e) => {
    e.preventDefault(); // Previne o comportamento padrão de submissão do formulário.

    // Obtém o valor do campo de pesquisa, converte para minúsculas e remove espaços em branco das extremidades.
    const inputValue = e.target.search.value.toLowerCase().trim();

    // Salva o valor da pesquisa no contexto usando saveInputSearchVal.
    saveInputSearchVal(inputValue);
  };

  return (
    // Formulário de pesquisa.
    <form className={classes.form} onSubmit={searchHandler}>
      {/* Rótulo para o campo de pesquisa */}
      <label htmlFor="search">Pesquise aqui</label>
      
      {/* Campo de entrada de pesquisa */}
      <input
        type="search"
        name="search"
        id="search"
        placeholder="O que você procura?"
      />
      
      {/* Botão para submissão da pesquisa */}
      <WrapperButton className={classes.btn} title="Procurar">
        {/* Ícone de pesquisa dentro do botão */}
        <IconSearch className={classes.iconSearch} />
      </WrapperButton>
    </form>
  );
};

export default SearchField; // Exporta o componente SearchField como padrão.
