import React, { createContext, useState, useEffect } from "react";

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [loginData, setLoginData] = useState(() => {
    const savedLoginData = localStorage.getItem("loginData");
    return savedLoginData ? JSON.parse(savedLoginData) : {};
  });

  const saveLoginData = (data) => {
    setLoginData(data);

    localStorage.setItem("loginData", JSON.stringify(data));
  };

  useEffect(() => {
    const savedLoginData = localStorage.getItem("loginData");
    if (savedLoginData) {
      setLoginData(JSON.parse(savedLoginData));
    }
  }, []);

  return (
    <LoginContext.Provider value={{ loginData, saveLoginData }}>
      {children}
    </LoginContext.Provider>
  );
};

export { LoginContext, LoginProvider };
