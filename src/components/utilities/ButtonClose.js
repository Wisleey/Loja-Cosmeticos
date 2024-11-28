import React from "react";
import classes from "./ButtonClose.module.css"; // Importa os estilos CSS específicos para o botão de fechar.
import { ReactComponent as IconFechar } from "../../assets/x.svg"; // Importa o ícone SVG para o botão de fechar.

const ButtonClose = ({ onClose, className }) => {
  // Combina as classes CSS do componente com classes adicionais passadas via props.
  const styles = classes.button + " " + className;

  return (
    <button className={styles} onClick={onClose}>
      <IconFechar /> {/* Renderiza o ícone de fechar dentro do botão */}
    </button>
  );
};

export default ButtonClose;
