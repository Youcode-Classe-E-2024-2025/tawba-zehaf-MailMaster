import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

const Login = ({ setIsAuthenticated }) => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await api.login(credentials);
            setIsAuthenticated(true);
        } catch (error) {
            setError('Invalid email or password');
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="login-form">
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your email"
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your password"
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>

            <div className="register-link">
                Don't have an account? <Link to="/register">Register here</Link>
            </div>
        </div>
    );
};

export default Login; 