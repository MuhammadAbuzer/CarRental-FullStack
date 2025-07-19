import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = JSON.parse(localStorage.getItem("theme"));
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const toggle = theme === "light" ? "dark" : "light";
    setTheme(toggle);
    localStorage.setItem("theme", JSON.stringify(toggle));
    document.documentElement.classList.toggle("dark", toggle === "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeProvider;
