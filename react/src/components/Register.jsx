import { useState } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validate passwords match
        if (userData.password !== userData.password_confirmation) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            await api.register(userData);
            // Redirect to login page after successful registration
            navigate('/login');
        } catch (error) {
            setError(error.message || 'Registration failed. Please try again.');
            console.error('Registration error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="register-form">
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your name"
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
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
                        value={userData.password}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your password"
                        minLength="8"
                    />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        name="password_confirmation"
                        value={userData.password_confirmation}
                        onChange={handleInputChange}
                        required
                        placeholder="Confirm your password"
                        minLength="8"
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>

            <div className="login-link">
                Already have an account? <a href="/login">Login here</a>
            </div>
        </div>
    );
};

export default Register; 