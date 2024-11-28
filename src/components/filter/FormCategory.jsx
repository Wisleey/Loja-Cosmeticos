import React, { useEffect, useState } from "react"; // Importa React e hooks específicos do React.
import WrapperFiltroSection from "../utilities/WrapperFiltroSection"; // Importa um componente utilitário para a seção de filtro.
import classes from "./FormCategory.module.css"; // Importa o arquivo CSS modularizado para estilização específica deste componente.

// Define uma lista de categorias fixas para o filtro.
const categories = ["cosmelan", "skin", "creme"]; 

const FormCategory = ({ setFilter, filterVal }) => {
  // Estado local para armazenar as categorias selecionadas pelo usuário.
  const [selectedCategories, setSelectedCategories] = useState(filterVal);

  // Função para lidar com mudanças nos checkboxes de categoria.
  const handleChange = ({ target }) => {
    if (target.checked) {
      // Se o checkbox foi marcado, adiciona a categoria selecionada ao estado.
      setSelectedCategories([...selectedCategories, target.value]);
    } else {
      // Se o checkbox foi desmarcado, remove a categoria selecionada do estado.
      setSelectedCategories((currValue) => {
        return currValue.filter((val) => val !== target.value); // Retorna um novo array sem a categoria desmarcada.
      });
    }
  };

  // useEffect que atualiza o filtro global sempre que as categorias selecionadas mudam.
  useEffect(() => {
    setFilter(selectedCategories); // Chama a função setFilter passada como prop para atualizar o filtro global.
  }, [selectedCategories, setFilter]); // Executa este efeito sempre que selectedCategories ou setFilter mudam.

  // useEffect que sincroniza o estado local com o valor do filtro global sempre que este muda.
  useEffect(() => {
    setSelectedCategories(filterVal); // Atualiza o estado local para refletir o filtro global atual.
  }, [filterVal]); // Executa este efeito sempre que filterVal muda.

  return (
    // Utiliza um componente utilitário para envolver a seção de categorias do filtro.
    <WrapperFiltroSection title="Categorias">
      <form className={classes.form}>
        {/* Mapeia a lista de categorias para criar checkboxes para cada uma. */}
        {categories.map((category) => (
          <div className={classes.divInput} key={category}>
            <input
              type="checkbox" // Define o tipo do input como checkbox.
              name="categoria" // Define o nome do grupo de checkboxes.
              id={category} // Define o id do checkbox para associá-lo ao rótulo correspondente.
              value={category} // O valor do checkbox corresponde à categoria que representa.
              onChange={handleChange} // Define a função para lidar com mudanças de estado.
              checked={selectedCategories.includes(category)} // Define se o checkbox está marcado ou não com base nas categorias selecionadas.
            />
            <label htmlFor={category}>{category}</label> {/* Rótulo associado ao checkbox correspondente. */}
          </div>
        ))}
      </form>
    </WrapperFiltroSection>
  );
};

export default FormCategory; // Exporta o componente FormCategory como padrão.
