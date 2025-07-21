import { createContext } from "react";
import { useSelector } from "react-redux";
export const TokenContext = createContext();

const TokenProvider = ({ children }) => {
  const { token } = useSelector((state) => state.userInfo);
  const setToken = () => {
    return localStorage.setItem("token", JSON.stringify(token));
  };
  const getToken = () => {
    return JSON.parse(localStorage.getItem("token"));
  };
  const clearToken = () => {
    return localStorage.clear();
  };

  return (
    <TokenContext.Provider value={{ setToken, getToken, clearToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenProvider;
