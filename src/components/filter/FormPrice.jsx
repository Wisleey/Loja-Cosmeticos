import React, { useEffect, useState } from "react"; // Importa React e os hooks useEffect e useState.
import WrapperFiltroSection from "../utilities/WrapperFiltroSection"; // Importa um componente utilitário para envolver a seção de filtro.
import classes from "./FormPrice.module.css"; // Importa o módulo CSS específico para estilização deste componente.

// Componente para filtragem por faixa de preço.
const FormPrice = ({ setFilter }) => {
  // Estado local para armazenar os valores mínimo e máximo do filtro de preços.
  const [prices, setPrices] = useState({ min: 0, max: 1000 });

  // Função para lidar com mudanças no campo de entrada de preço mínimo.
  const handleChangeMin = ({ target }) => {
    // Atualiza o estado com o novo valor mínimo.
    setPrices((currVal) => ({ ...currVal, min: target.value }));
  };

  // Função para lidar com mudanças no campo de entrada de preço máximo.
  const handleChangeMax = ({ target }) => {
    // Atualiza o estado com o novo valor máximo.
    setPrices((currVal) => ({ ...currVal, max: target.value }));
  };

  // Efeito que atualiza o filtro global de preços sempre que o estado `prices` muda.
  useEffect(() => {
    setFilter(prices); // Atualiza o filtro global com os valores de preços.
  }, [setFilter, prices]); // Executa este efeito sempre que `setFilter` ou `prices` mudam.

  return (
    // Utiliza um componente utilitário para envolver a seção de preço do filtro.
    <WrapperFiltroSection title="Preço">
      <form className={classes.form}>
        {/* Campo de entrada para o preço mínimo */}
        <label htmlFor="check1">
          Min (R$)
          <input
            type="number" // Tipo de entrada numérica.
            step="0.01" // Define o incremento de cada mudança no input.
            min="0" // Define o valor mínimo que pode ser digitado.
            name="valor_min" // Nome do campo de entrada.
            id="min" // ID do campo de entrada.
            value={prices.min} // Valor atual do campo, vinculado ao estado `prices`.
            onChange={handleChangeMin} // Função para manipular mudanças no campo.
          />
        </label>
        {/* Campo de entrada para o preço máximo */}
        <label htmlFor="check1">
          Max (R$)
          <input
            type="number" // Tipo de entrada numérica.
            step="0.01" // Define o incremento de cada mudança no input.
            name="valor_max" // Nome do campo de entrada.
            id="max" // ID do campo de entrada.
            value={prices.max} // Valor atual do campo, vinculado ao estado `prices`.
            onChange={handleChangeMax} // Função para manipular mudanças no campo.
          />
        </label>
      </form>
    </WrapperFiltroSection>
  );
};

export default FormPrice; // Exporta o componente `FormPrice` como padrão.
