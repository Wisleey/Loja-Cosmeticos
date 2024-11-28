import { useEffect, useState } from "react";

// Hook customizado para gerenciar a visibilidade de um elemento
const useVisibility = (ref) => {
  // Estado para armazenar se o elemento está visível ou não
  const [elementVisible, setElementVisible] = useState(true);

  useEffect(() => {
    // Função para esconder o menu se o clique for fora do elemento referenciado
    const hideMenu = (e) => {
      // Verifica se o clique não foi no elemento referenciado nem em seus filhos
      if (ref && e.target !== ref.current && !ref.current.contains(e.target)) {
        setElementVisible(false); // Oculta o elemento
      }
    };

    // Função para ajustar a visibilidade do elemento com base no tamanho da janela
    const resizeWindow = () => {
      // Se a largura da janela for menor que 925px, oculta o elemento
      if (window.innerWidth < 925) {
        setElementVisible(false);
        // Adiciona o listener de clique para esconder o menu
        document.addEventListener("click", hideMenu);
      } else {
        // Se a largura da janela for maior ou igual a 925px, mostra o elemento
        setElementVisible(true);
        // Remove o listener de clique, pois o elemento deve estar visível
        document.removeEventListener("click", hideMenu);
      }
    };

    // Inicializa o ajuste da visibilidade com base no tamanho da janela
    resizeWindow();

    // Adiciona o listener para mudanças no tamanho da janela
    window.addEventListener("resize", resizeWindow);
    
    // Cleanup function para remover o listener quando o componente for desmontado
    return () => window.removeEventListener("resize", resizeWindow);
  }, [ref]); // Dependência do efeito é a referência ao elemento

  // Retorna o estado de visibilidade e a função para atualizar o estado
  return { elementVisible, setElementVisible };
};

export default useVisibility;
