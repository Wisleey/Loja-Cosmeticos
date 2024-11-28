import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"; // Importa React e vários hooks importantes do React.
import { FilterContext } from "../../context/FilterContext"; // Importa o contexto de filtro para gerenciar o estado de filtro globalmente.
import { AlertContext } from "../../context/AlertContext"; // Importa o contexto de alerta para mostrar mensagens de alerta para o usuário.
import WrapperButton from "../utilities/WrapperButton"; // Importa um componente de botão personalizado.
import ButtonClose from "../utilities/ButtonClose"; // Importa um componente de botão de fechar.
import classes from "./Filter.module.css"; // Importa o arquivo CSS modularizado para estilização específica deste componente.
import FormCategory from "./FormCategory"; // Importa o componente de formulário para seleção de categorias de filtro.

import useVisibility from "../../customHook/useVisibility"; // Importa um hook personalizado para gerenciar a visibilidade de elementos.
import { ReactComponent as IconFilter } from "../../assets/funnel.svg"; // Importa um ícone SVG como componente React.

const Filter = () => {
  const refBtnFilter = useRef(); // Cria uma referência para o botão de filtro para controle de visibilidade.
  const { elementVisible, setElementVisible } = useVisibility(refBtnFilter); // Usa o hook personalizado useVisibility para controlar a visibilidade do componente de filtro.
  
  // Utiliza o contexto de filtro para acessar funções e estados relacionados ao filtro.
  const {
    saveFilter, // Função para salvar o filtro aplicado.
    initialFilter, // O filtro inicial que é usado como estado padrão.
    filter: filterSaved, // O filtro salvo atualmente no contexto.
  } = useContext(FilterContext);
  
  const { showAlert } = useContext(AlertContext); // Usa o contexto de alerta para exibir alertas para o usuário.

  const [filter, setFilter] = useState(initialFilter); // Estado local para armazenar o filtro atualmente aplicado.



 

  const setFilterCategories = useCallback((categories) => {
    setFilter((currVal) => ({ ...currVal, categories })); // Atualiza apenas o campo de categorias no estado do filtro.
  }, []);

  // Botão de filtro que, quando clicado, alterna a visibilidade do painel de filtros.
  const btnFilter = (
    <button
      className={`${classes.btnOpenFilter} ${
        elementVisible ? classes.filterVisible : ""
      }`}
      aria-label="Abrir filtro"
      type="button"
      onClick={() => setElementVisible((currVal) => !currVal)} // Alterna o estado de visibilidade do painel de filtros.
    >
      <IconFilter /> {/* Ícone SVG para o botão de filtro. */}
    </button>
  );

  // Função para aplicar o filtro atualmente definido no estado local.
  const applyFilter = () => {
    saveFilter(filter); // Salva o filtro no contexto global.
    
    // Verifica se o filtro atual é diferente do filtro salvo anteriormente.
    const filterHasChanged = !(
      JSON.stringify(filterSaved) === JSON.stringify(filter)
    );
    
    if (filterHasChanged) showAlert("Filtro aplicado"); // Mostra um alerta se o filtro tiver sido alterado.
  };

  // Função para limpar o filtro, retornando ao estado inicial.
  const cleanFilter = () => {
    saveFilter(initialFilter); // Salva o filtro inicial no contexto global, limpando os filtros aplicados.
    showAlert("Filtro excluído"); // Exibe um alerta indicando que o filtro foi limpo.
  };

  // Efeito que sincroniza o estado local do filtro com o filtro salvo no contexto sempre que ele muda.
  useEffect(() => {
    setFilter(filterSaved);
  }, [filterSaved]);

  return (
    <>
      <div className={classes.filterContainer} ref={refBtnFilter}> {/* Div que contém todo o conteúdo do filtro, controlada pela referência de visibilidade. */}
        {btnFilter} {/* Renderiza o botão de filtro para abrir/fechar o painel de filtros. */}
        <section
          className={`${classes.filter} ${
            elementVisible ? classes.filterVisible : ""
          }`}
        >
          {/* Painel de filtros que exibe as opções de filtro quando visível. */}
          <ButtonClose
            onClose={() => setElementVisible(false)} // Define o botão de fechar para esconder o painel de filtros.
            className={classes.btnClose}
          />
          <h2>Filtrar pesquisa</h2> {/* Título do painel de filtros. */}
          <FormCategory
            setFilter={setFilterCategories} // Passa a função de callback para o componente FormCategory para atualizar categorias.
            filterVal={filter.categories} // Passa o valor atual de categorias no estado de filtro.
          />
         
          
          <WrapperButton className={classes.btn} onClick={applyFilter}> {/* Botão para aplicar o filtro. */}
            Aplicar filtro
          </WrapperButton>
          <button onClick={cleanFilter} className={classes.btnClear}> {/* Botão para limpar o filtro. */}
            Limpar filtro
          </button>
        </section>
      </div>
    </>
  );
};

export default Filter; // Exporta o componente Filter como padrão.
