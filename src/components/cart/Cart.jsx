import React, { useContext } from "react"; // Importa o React e o hook useContext para usar o contexto dentro do componente.
import { CartContext } from "../../context/CartContext"; // Importa o contexto do carrinho, que contém o estado e as funções relacionadas ao carrinho.
import Modal from "../utilities/Modal"; // Importa o componente Modal para exibir o carrinho como uma janela modal.
import CartItem from "./CartItem"; // Importa o componente CartItem que representa um item individual no carrinho.
import classes from "./Cart.module.css"; // Importa o arquivo CSS modularizado para estilização específica deste componente.
import WrapperButton from "../utilities/WrapperButton"; // Importa o componente WrapperButton que é utilizado para criar um botão estilizado.
import ButtonClose from "../utilities/ButtonClose"; // Importa o componente ButtonClose que é utilizado para fechar o modal.
import { ColorModeContext } from "../../context/ColorModeContext"; // Importa o contexto de modo de cor, que define se o tema é claro ou escuro.

const Cart = ({ onClose, onShowFinal }) => { // Define o componente funcional Cart que recebe as props onClose e onShowFinal.
  const { itemsCart, updateAmount, removeItem, removeAll } =
    useContext(CartContext); // Utiliza o hook useContext para acessar o contexto do carrinho e desestruturar as propriedades necessárias.

  // Mapeia os itens do carrinho para renderizar o componente CartItem para cada item.
  const listItemsCart = itemsCart.items.map((item) => (
    <CartItem
      key={item.name} // Usa o nome do item como chave única para cada componente CartItem.
      name={item.name} // Passa o nome do item como prop para CartItem.
      price={item.price} // Passa o preço do item como prop para CartItem.
      img={item.img} // Passa a imagem do item como prop para CartItem.
      amount={item.amount} // Passa a quantidade do item como prop para CartItem.
      updateAmount={updateAmount} // Passa a função de atualizar a quantidade como prop para CartItem.
      removeItem={removeItem} // Passa a função de remover item como prop para CartItem.
    />
  ));

  // Função para lidar com a exibição do modal de finalização de compra.
  const showFinalModalHandler = () => {
    onClose(); // Fecha o modal atual.
    removeAll(); // Remove todos os itens do carrinho.
    onShowFinal(); // Chama a função para exibir o modal de finalização.
  };

  const { isDarkMode } = useContext(ColorModeContext); // Utiliza o hook useContext para acessar o estado de tema claro/escuro.

  return (
    <Modal onClose={onClose} isDarkMode={isDarkMode}> {/* Renderiza o componente Modal passando as props onClose e isDarkMode. */}
      <div className={classes.header}> {/* Div que representa o cabeçalho do modal com estilização específica. */}
        <p>Seu carrinho</p> {/* Texto fixo exibindo "Seu carrinho". */}
        <button onClick={removeAll}>Esvaziar carrinho</button> {/* Botão que ao ser clicado chama a função removeAll para esvaziar o carrinho. */}
      </div>
      <ul className={classes.cartList}> {/* Lista não ordenada para exibir os itens do carrinho. */}
        {itemsCart.items.length ? ( // Condicional que verifica se há itens no carrinho.
          listItemsCart // Se houver itens, renderiza a lista de itens do carrinho.
        ) : (
          <p className={classes.noItems}>Não há itens no seu carrinho.</p> // Se não houver itens, exibe uma mensagem.
        )}
      </ul>
      {itemsCart.items.length ? ( // Condicional que verifica novamente se há itens no carrinho para exibir o subtotal e botão de finalizar.
        <div className={classes.total}> {/* Div que representa a seção do subtotal com estilização específica. */}
          <p>
            Subtotal: <span>R$ {Number(itemsCart.total).toFixed(2)}</span> {/* Exibe o subtotal formatado em duas casas decimais. */}
          </p>
          <WrapperButton onClick={showFinalModalHandler}> {/* Botão estilizado para finalizar a compra. */}
            Finalizar compra
          </WrapperButton>
        </div>
      ) : (
        "" // Se não houver itens, não exibe nada.
      )}
      <ButtonClose onClose={onClose} /> {/* Renderiza o botão de fechar modal, passando a prop onClose. */}
    </Modal>
  );
};

export default Cart; // Exporta o componente Cart como padrão.
