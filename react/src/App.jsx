import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Campaigns from './components/Campaigns';
import Subscribers from './components/Subscribers';
import Newsletters from './components/Newsletters';
import Login from './components/Login';
import Register from './components/Register';
import SendNewsletter from './components/SendNewsletter';
import LandingPage from './components/LandingPage';
import { api } from './services/api';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  const handleLogout = () => {
    api.logout();
    setIsAuthenticated(false);
  };

  if (loading) {
    return <div>Loading...</div>;
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
              <Link to="/send-newsletter">Send Newsletter</Link>
              <button onClick={handleLogout}>Logout</button>
            </nav>
            <main className="content">
              <Routes>
                <Route path="/campaigns" element={<Campaigns />} />
                <Route path="/subscribers" element={<Subscribers />} />
                <Route path="/newsletters" element={<Newsletters />} />
                <Route path="/send-newsletter" element={<SendNewsletter />} />
                <Route path="*" element={<Navigate to="/campaigns" />} />
              </Routes>
            </main>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
