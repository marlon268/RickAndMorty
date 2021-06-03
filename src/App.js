import Header from './components/Header.jsx'
import Characters from "./components/Characters.jsx"
import ThemeContext from "./context/ThemeContext.js"
import { useContext } from 'react';

function App() {
  const {theme, setTheme} = useContext(ThemeContext);
  const handleClick = () => {
    setTheme(!theme)
  };
  return (
    <div className={theme ? 'light-mode contenedor' : 'dark-mode contenedor'}>
      <Header handleClick={handleClick} />
      <Characters/>
    </div>
  );
}

export default App;
