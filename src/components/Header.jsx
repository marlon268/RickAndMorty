import { useContext } from "react";
import ThemeContext from "../context/ThemeContext.js";
import "../styles/Header.css";

const Header = ({ handleClick }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="Header">
      <h1>Rick And Morty</h1>
      <div className="Header-button">
        <button
          type="button"
          onClick={handleClick}
          className={!theme ? "button button-dark" : "button button-light"}
        >
          {theme ? "Dark" : "Light"}
        </button>
      </div>
    </div>
  );
};

export default Header;
