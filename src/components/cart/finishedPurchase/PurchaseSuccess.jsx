import React, { useContext } from "react"; // Importa o React e o hook useContext para usar o contexto dentro do componente.
import Modal from "../../utilities/Modal"; // Importa o componente Modal para exibir a confirmação de compra como uma janela modal.
import WrapperButton from "../../utilities/WrapperButton"; // Importa o componente WrapperButton que é utilizado para criar um botão estilizado.
import ButtonClose from "../../utilities/ButtonClose"; // Importa o componente ButtonClose que é utilizado para fechar o modal.
import classes from "./PurchaseSuccess.module.css"; // Importa o arquivo CSS modularizado para estilização específica deste componente.
import { ColorModeContext } from "../../../context/ColorModeContext"; // Importa o contexto de modo de cor, que define se o tema é claro ou escuro.

// Define o componente funcional PurchaseSuccess que recebe as props onClose e orderDetails.
const PurchaseSuccess = ({ onClose, orderDetails }) => {
  const { isDarkMode } = useContext(ColorModeContext); // Utiliza o hook useContext para acessar o estado de tema claro/escuro.

  // Função para enviar o pedido para o WhatsApp.
  const sendOrderToWhatsApp = () => {
    const phoneNumber = "83991812589"; // Número de telefone para o qual a mensagem será enviada via WhatsApp.
    const message = `Olá! Gostaria de fazer o seguinte pedido:\n${orderDetails}`; // Mensagem com os detalhes do pedido.
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`; // Monta a URL do WhatsApp com o número de telefone e a mensagem codificada.
    window.open(whatsappUrl, "_blank"); // Abre o link do WhatsApp em uma nova aba do navegador.
  };

  return (
    <Modal onClose={onClose} isDarkMode={isDarkMode}>
      {" "}
      {/* Renderiza o componente Modal passando as props onClose e isDarkMode. */}
      <div className={classes.modal}>
        {" "}
        {/* Div que representa o conteúdo do modal com estilização específica. */}
        <p className={classes.title}>Parabéns!</p>{" "}
        {/* Título do modal com uma mensagem de sucesso. */}
        <p>Sua compra esta sendo processada.</p>{" "}
        {/* Mensagem de confirmação de que a compra foi finalizada. */}
        <p>Seu pedido chegará em breve.</p>{" "}
        {/* Mensagem informando ao usuário que o pedido está a caminho. */}
        <WrapperButton className={classes.button} onClick={sendOrderToWhatsApp}>
          {" "}
          {/* Botão estilizado para enviar o pedido via WhatsApp. */}
          Finalizar Compra
        </WrapperButton>
      </div>
      <ButtonClose onClose={onClose} />{" "}
      {/* Renderiza o botão de fechar modal, passando a prop onClose. */}
    </Modal>
  );
};

export default PurchaseSuccess; // Exporta o componente PurchaseSuccess como padrão.
