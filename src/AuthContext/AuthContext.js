import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = (data) => {
    localStorage.setItem('email', data.email);
    localStorage.setItem('full_name', data.full_name);
    localStorage.setItem('role', data.role);
    localStorage.setItem('department', data.department);
    localStorage.setItem('user_id', data._id);

    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('full_name');
    localStorage.removeItem('role');
    localStorage.removeItem('department');
    localStorage.removeItem('user_id');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};