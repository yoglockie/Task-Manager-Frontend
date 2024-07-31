import React from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import PublicRoute from "./AuthContext/PublicRoute";
import PrivateRoute from "./AuthContext/PrivateRoute";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from "./AuthContext/AuthContext"; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path="*"
            element={<div>404 Not Found</div>}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
