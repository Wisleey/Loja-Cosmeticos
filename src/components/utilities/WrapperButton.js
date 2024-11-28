import React from "react";
import classes from "./WrapperButton.module.css"; // Importa os estilos CSS específicos para o botão

const WrapperButton = ({ children, className, onClick, title }) => {
  // Combina a classe CSS do botão com quaisquer classes adicionais passadas via prop className
  const styles = classes.button + " " + className;

  return (
    <button 
      className={styles} // Aplica as classes CSS combinadas ao botão
      onClick={onClick} // Adiciona a função onClick que será chamada quando o botão for clicado
      title={title} // Adiciona um título ao botão para tooltip (dica que aparece ao passar o mouse sobre o botão)
    >
      {children} {/* Renderiza o conteúdo passado como filho do botão */}
    </button>
  );
};

export default WrapperButton;
