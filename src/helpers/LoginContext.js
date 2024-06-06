import React, { createContext, useState } from 'react';


const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [loginData, setLoginData] = useState({});

  const saveLoginData = (data) => {
    setLoginData(data);
  };

  return (
    <LoginContext.Provider value={{ loginData, saveLoginData }}>
      {children}
    </LoginContext.Provider>
  );
};

export { LoginContext, LoginProvider };