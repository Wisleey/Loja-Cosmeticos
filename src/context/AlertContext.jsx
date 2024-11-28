import React, { createContext, useRef, useState } from "react";

// Cria um contexto para o alerta
export const AlertContext = createContext();

const AlertContextProvider = ({ children }) => {
  // Estado para controlar se o alerta está visível
  const [alertIsShown, setAlertIsShown] = useState(false);

  // Estado para armazenar o conteúdo do alerta
  const [alertContent, setAlertContent] = useState("");

  // Referência para o timeout, usada para limpar o timeout existente
  const timeOutRef = useRef();

  // Função para mostrar o alerta
  const showAlert = (msg) => {
    // Limpa qualquer timeout existente para evitar que múltiplos alertas sejam exibidos simultaneamente
    clearTimeout(timeOutRef.current);

    // Atualiza o estado para exibir o alerta
    setAlertIsShown(true);
    setAlertContent(msg);

    // Define um timeout para ocultar o alerta após um determinado período (1500ms)
    timeOutRef.current = setTimeout(() => {
      setAlertIsShown(false);
      setAlertContent("");
    }, 1500);
  };

  return (
    // Fornece o estado do alerta e a função showAlert para os componentes filhos
    <AlertContext.Provider value={{ alertIsShown, alertContent, showAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContextProvider;
