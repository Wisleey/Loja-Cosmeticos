import React, { useState } from "react"; // Importa React e o hook useState para gerenciar estados locais no componente.
import classes from "./CartItem.module.css"; // Importa o arquivo CSS modularizado para estilização específica deste componente.

// Define o componente funcional CarItem que recebe várias props para representar um item do carrinho.
const CarItem = ({ name, price, img, amount, updateAmount, removeItem }) => {
  const [newAmount, setNewAmount] = useState(amount); // Define um estado local newAmount inicializado com o valor de amount (quantidade do item).

  // Função que é chamada quando o valor do input de quantidade é alterado.
  const updateAmountHandler = (e) => {
    const value = +e.target.value; // Converte o valor do input de string para número.
    setNewAmount(value); // Atualiza o estado local newAmount com o novo valor.
    updateAmount(name, value); // Chama a função updateAmount passada como prop, atualizando a quantidade do item no contexto do carrinho.
  };

  // Função para remover o item do carrinho, chamada quando o botão "Excluir item" é clicado.
  const removeItemFromCart = () => {
    removeItem(name); // Chama a função removeItem passada como prop, removendo o item do carrinho pelo seu nome.
  };

  return (
    <li className={classes.item}> {/* Renderiza um item da lista do carrinho com estilização específica. */}
      <div className={classes.imgDiv}> {/* Div para a imagem do produto com estilização específica. */}
        <img src={require(`../../assets/imgs-produtos/${img}`)} alt={name} /> {/* Exibe a imagem do produto, carregando o arquivo dinamicamente. */}
      </div>
      <div className={classes.infos}> {/* Div para as informações do produto com estilização específica. */}
        <p>{name}</p> {/* Exibe o nome do produto. */}
        <p className={classes.price}>R$ {Number(price * amount).toFixed(2)}</p> {/* Exibe o preço total para a quantidade atual do produto, formatado com duas casas decimais. */}
        <p>
          {amount} unidade(s) de R$ {Number(price).toFixed(2)} {/* Exibe a quantidade de unidades e o preço unitário do produto. */}
        </p>
        <button className={classes.btn} onClick={removeItemFromCart}> {/* Botão para remover o item do carrinho. */}
          Excluir item
        </button>
      </div>
      <form> {/* Formulário para alterar a quantidade do item no carrinho. */}
        <label htmlFor="quantidade">qt.</label> {/* Label para o input de quantidade. */}
        <input
          type="number" // Define o tipo do input como numérico.
          id="quantidade" // Atribui um ID ao input.
          name="quantidade" // Atribui um nome ao input.
          min="1" // Define o valor mínimo do input como 1 (não permite números menores que 1).
          step="1" // Define o incremento/decremento de 1 unidade por vez.
          value={newAmount} // Define o valor do input como o estado newAmount.
          onChange={updateAmountHandler} // Define o manipulador de evento para mudanças no input de quantidade.
        />
      </form>
    </li>
  );
};

export default CarItem; // Exporta o componente CarItem como padrão.
