import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css"; // Importa os estilos CSS específicos para o modal

// Componente Backdrop
const Backdrop = ({ onClose }) => {
  // Renderiza um fundo semitransparente que fecha o modal ao clicar
  return <div className={classes.backdrop} onClick={onClose}></div>;
};

// Componente ModalContent
const ModalContent = ({ children, isDarkMode }) => {
  // Efeito para logar o estado do modo escuro
  useEffect(() => {
    console.log(isDarkMode);
  }, [isDarkMode]);

  return (
    <div className={`${classes.modal} ${isDarkMode ? "darkMode" : ""}`}>
      {/* Adiciona a classe 'darkMode' se o modo escuro estiver ativado */}
      <div className={classes.content}>
        {children} {/* Renderiza o conteúdo passado como filho do modal */}
      </div>
    </div>
  );
};

// Componente Modal
const Modal = ({ children, onClose, isDarkMode }) => {
  // Obtém o elemento DOM onde o modal será montado
  const modalRoot = document.getElementById("modal");

  return (
    <>
      {/* Usa React Portal para renderizar o Backdrop e o ModalContent fora da hierarquia do DOM principal */}
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, modalRoot)}
      {ReactDOM.createPortal(
        <ModalContent isDarkMode={isDarkMode}>{children}</ModalContent>,
        modalRoot
      )}
    </>
  );
};

export default Modal;
