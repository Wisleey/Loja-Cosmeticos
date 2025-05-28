import React from "react";
import classes from "./Footer.module.css";
import { ReactComponent as IconGithub } from "../../assets/github.svg";

const Footer = ({ isDarkMode }) => {
  return (
    <footer
      className={`${classes.footer} ${isDarkMode ? classes.darkMode : ""}`}
    >
      <p className={isDarkMode ? classes.darkText : ""}>
        Projeto feito por{" "}
        <a
          href="https://github.com/Wisleey"
          target="_blank"
          rel="noreferrer"
          className={isDarkMode ? classes.darkLink : ""}
        >
          Wisley rodrigues{" "}
          <IconGithub className={isDarkMode ? classes.darkIcon : ""} />
        </a>
      </p>
    </footer>
  );
};

export default Footer;
