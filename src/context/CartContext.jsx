import React, { createContext, useReducer } from "react";

// Cria um contexto para o carrinho de compras
export const CartContext = createContext();

// Estado inicial do carrinho de compras
const initialState = {
  items: [], // Lista de itens no carrinho
  total: 0,  // Total acumulado do valor dos itens
};

// Redutor que manipula ações relacionadas ao carrinho de compras
const reducerCart = (state, action) => {
  if (action.type === "ADD_ITEM") {
    // Adiciona um item ao carrinho
    const indexInCart = state.items.findIndex(
      (item) => item.name === action.item.name
    );
    const itemAlreadyInCart = state.items[indexInCart];
    let newListItems;
    if (itemAlreadyInCart) {
      // Atualiza a quantidade do item se ele já estiver no carrinho
      const itemUpdated = {
        ...itemAlreadyInCart,
        amount: itemAlreadyInCart.amount + action.item.amount,
      };
      newListItems = [...state.items];
      newListItems[indexInCart] = itemUpdated;
    } else {
      // Adiciona o novo item ao carrinho
      newListItems = [...state.items, action.item];
    }
    const totalUpdated = state.total + action.item.price * action.item.amount;
    return { items: newListItems, total: totalUpdated };
  }

  if (action.type === "UPDATE_ITEM") {
    // Atualiza a quantidade de um item existente
    const indexItem = state.items.findIndex(
      (item) => item.name === action.itemName
    );
    const oldItem = state.items[indexItem];

    const totalUpdated =
      state.total -
      oldItem.amount * oldItem.price +
      action.amount * state.items[indexItem].price;

    const itemUpdated = { ...oldItem, amount: action.amount };
    let newListItems = [...state.items];
    newListItems[indexItem] = itemUpdated;

    return { items: newListItems, total: totalUpdated };
  }

  if (action.type === "REMOVE_ITEM") {
    // Remove um item do carrinho
    const newList = state.items.filter((item) => item.name !== action.name);

    const indexItem = state.items.findIndex(
      (item) => item.name === action.name
    );
    const item = state.items[indexItem];
    const newAmount = state.total - item.price * item.amount;

    return { items: newList, total: newAmount };
  }

  if (action.type === "REMOVE_ALL") {
    // Remove todos os itens do carrinho
    return initialState;
  }
};

// Provedor de contexto para o carrinho de compras
const CartContextProvider = ({ children }) => {
  // Usa o useReducer para gerenciar o estado do carrinho
  const [itemsCart, dispatchItemsCart] = useReducer(reducerCart, initialState);

  // Funções para despachar ações ao redutor
  const addItemToCart = (item) => {
    dispatchItemsCart({ type: "ADD_ITEM", item });
  };
  const updateCartItem = (itemName, amount) => {
    dispatchItemsCart({ type: "UPDATE_ITEM", itemName, amount });
  };
  const removeCartItem = (name) => {
    dispatchItemsCart({ type: "REMOVE_ITEM", name });
  };
  const removeAllFromCart = () => {
    dispatchItemsCart({ type: "REMOVE_ALL" });
  };

  return (
    <CartContext.Provider
      value={{
        itemsCart,           // Estado atual do carrinho
        addItem: addItemToCart,      // Função para adicionar item
        updateAmount: updateCartItem, // Função para atualizar a quantidade de um item
        removeItem: removeCartItem,   // Função para remover um item
        removeAll: removeAllFromCart, // Função para remover todos os itens
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
