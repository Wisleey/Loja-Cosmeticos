import React from 'react';
import classes from './WrapperFiltroSection.module.css'; // Importa os estilos CSS específicos para o WrapperFiltroSection

const WrapperFiltroSection = ({ title, children }) => {
  return (
    <section className={classes.section}> {/* Aplica a classe CSS ao elemento <section> */}
      <p className={classes.title}> {/* Aplica a classe CSS ao elemento <p> que contém o título */}
        {title} {/* Renderiza o título passado como prop */}
      </p>
      {children} {/* Renderiza o conteúdo passado como filho do WrapperFiltroSection */}
    </section>
  );
};

export default WrapperFiltroSection;
