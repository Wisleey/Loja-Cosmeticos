import { createContext, useState } from "react";

// Cria um contexto para o modo de cor
export const ColorModeContext = createContext();

// Provedor de contexto para o modo de cor
const ColorModeContextProvider = ({ children }) => {
  // Estado para armazenar o status do modo escuro
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Função para alternar entre modo claro e escuro
  const changeMode = () => {
    setIsDarkMode((currMode) => !currMode);
  };

  return (
    // Provedor do contexto, fornecendo o estado e a função para alternar o modo
    <ColorModeContext.Provider value={{ isDarkMode, changeMode }}>
      {children}
    </ColorModeContext.Provider>
  );
};

export default ColorModeContextProvider;
