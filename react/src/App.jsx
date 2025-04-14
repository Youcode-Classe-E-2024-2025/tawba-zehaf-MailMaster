import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Campaigns from './components/Campaigns';
import Subscribers from './components/Subscribers';
import Newsletters from './components/Newsletters';
import Login from './components/Login';
import Register from './components/Register';
import LandingPage from './components/LandingPage';
import { api } from './services/api';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('auth_token');
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  const handleLogout = () => {
    api.logout();
    setIsAuthenticated(false);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <div className="app">
        {isAuthenticated ? (
          <>
            <nav className="navigation">
              <Link to="/campaigns">Campaigns</Link>
              <Link to="/subscribers">Subscribers</Link>
              <Link to="/newsletters">Newsletters</Link>
              <button onClick={handleLogout}>Logout</button>
            </nav>
            <main className="content">
              <Routes>
                <Route path="/campaigns" element={<Campaigns />} />
                <Route path="/subscribers" element={<Subscribers />} />
                <Route path="/newsletters" element={<Newsletters />} />
                <Route path="*" element={<Navigate to="/campaigns" replace />} />
              </Routes>
            </main>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;
