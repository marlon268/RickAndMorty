import React, { useState } from 'react'

const ThemeContext = React.createContext({});

export function ThemeContextProvider({ children }) {
    const [theme, setTheme] = useState(true);

    return(
        <ThemeContext.Provider value={{ theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContext;