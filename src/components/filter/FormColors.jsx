import React, { useEffect, useState } from "react"; // Importa React e os hooks useEffect e useState.
import WrapperFiltroSection from "../utilities/WrapperFiltroSection"; // Importa um componente utilitário para envolver a seção de filtro.
import classes from "./FormColors.module.css"; // Importa o módulo CSS específico para estilização deste componente.

// Define uma lista de cores disponíveis para o filtro.
const colors = [
  {
    colorName: "rosa",  // Nome da cor a ser exibido.
    bg: "#FE96C2",     // Cor de fundo para o botão de cor.
    hex: "#570B2B",    // Cor do texto para contraste.
  },
  {
    colorName: "verde",
    bg: "#7FD878",
    hex: "#245320",
  },
  {
    colorName: "laranja",
    bg: "#F4B770",
    hex: "#563309",
  },
  {
    colorName: "azul",
    bg: "#96C0FE",
    hex: "#1F3556",
  },
  {
    colorName: "vermelho",
    bg: "#F56F6B",
    hex: "#520F0F",
  },
  {
    colorName: "roxo",
    bg: "#B796FE",
    hex: "#2A1B4A",
  },
  {
    colorName: "amarelo",
    bg: "#F1F371",
    hex: "#4A4B0A",
  },
  {
    colorName: "preto",
    bg: "#5C5C5C",
    color: "#FFFFFF", // Cor do texto para maior contraste com o fundo.
  },
  {
    colorName: "branco",
    bg: "#FFFFFF",
    color: "#2C2C2C", // Cor do texto para maior contraste com o fundo.
  },
];

const FormCores = ({ setFilter, filterVal }) => {
  // Estado local para armazenar as cores selecionadas pelo usuário.
  const [selectedColors, setSelectedColors] = useState([]);

  // Função para lidar com mudanças nos checkboxes de cores.
  const handleChange = ({ target }) => {
    if (target.checked) {
      // Se o checkbox foi marcado, adiciona a cor selecionada ao estado.
      setSelectedColors([...selectedColors, target.value]);
    } else {
      // Se o checkbox foi desmarcado, remove a cor selecionada do estado.
      setSelectedColors((currValue) => {
        return currValue.filter((val) => val !== target.value); // Retorna um novo array sem a cor desmarcada.
      });
    }
  };

  // Efeito que atualiza o filtro global com as cores selecionadas sempre que elas mudam.
  useEffect(() => {
    setFilter(selectedColors); // Atualiza o filtro global com as cores selecionadas.
  }, [setFilter, selectedColors]); // Executa este efeito sempre que selectedColors ou setFilter mudam.

  // Efeito que sincroniza o estado local com o valor do filtro global sempre que ele muda.
  useEffect(() => {
    setSelectedColors(filterVal); // Atualiza o estado local para refletir o filtro global atual.
  }, [filterVal]); // Executa este efeito sempre que filterVal muda.

  return (
    // Utiliza um componente utilitário para envolver a seção de cores do filtro.
    <WrapperFiltroSection title="Cores">
      <form className={classes.listColors}>
        {/* Mapeia a lista de cores para criar elementos de input para cada uma. */}
        {colors.map((item) => (
          <div
            className={`${classes.colorItem} ${
              selectedColors.includes(item.colorName) ? classes.checked : ""
            }`} // Aplica uma classe adicional se a cor estiver selecionada.
            key={item.colorName} // Define a chave para cada elemento de cor, importante para a reconciliação no React.
          >
            <label
              htmlFor={item.colorName} // Associa o rótulo ao input correspondente.
              style={{ backgroundColor: item.bg, color: item.hex }} // Estilo inline para definir as cores de fundo e texto.
              className={classes.btnColor} // Classe CSS para estilização adicional.
              title={item.colorName} // Texto para exibir ao passar o mouse sobre o botão de cor.
            >
              <span>{item.colorName}</span> {/* Texto visível no botão de cor. */}
            </label>
            <input
              type="checkbox" // Tipo de input como checkbox.
              name="colors" // Nome do grupo de checkboxes.
              id={item.colorName} // ID do checkbox para associar ao rótulo correspondente.
              value={item.colorName} // Valor do checkbox, correspondente ao nome da cor.
              onChange={handleChange} // Função para lidar com mudanças no estado de seleção.
              checked={selectedColors.includes(item.colorName)} // Define se o checkbox está marcado com base nas cores selecionadas.
            />
          </div>
        ))}
      </form>
    </WrapperFiltroSection>
  );
};

export default FormCores; // Exporta o componente FormCores como padrão.
