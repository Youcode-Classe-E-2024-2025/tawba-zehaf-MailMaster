import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const LandingPage = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        const storedEmail = localStorage.getItem('user_email');
        setIsAuthenticated(!!token);
        if (storedEmail) {
            setUserEmail(storedEmail);
            setEmail(storedEmail);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        setLoading(true);

        try {
            // Validate email
            if (!email.trim() || !email.includes('@')) {
                throw new Error('Please enter a valid email address');
            }

            await api.subscribeToNewsletter(email);
            setSuccess(true);
            setEmail('');
        } catch (error) {
            console.error('Error subscribing:', error);
            setError(error.message || 'Failed to subscribe. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        api.logout();
        setIsAuthenticated(false);
        setUserEmail('');
        setEmail('');
        navigate('/');
    };

    return (
        <div className="landing-page">
            <header className="landing-header">
                <div className="header-content">
                    <h1>Tech Insights</h1>
                    <nav className="auth-nav">
                        {isAuthenticated ? (
                            <>
                                <span className="user-email">{userEmail}</span>
                                <Link to="/campaigns" className="nav-link">Dashboard</Link>
                                <button onClick={handleLogout} className="nav-button">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="nav-link">Login</Link>
                                <Link to="/register" className="nav-link">Register</Link>
                            </>
                        )}
                    </nav>
                </div>
            </header>

            <main className="main-content">
                <section className="hero">
                    <h2>Stay updated with the latest in technology, programming, and innovation</h2>
                </section>

                <section className="features">
                    <div className="feature">
                        <h3>Latest Tech News</h3>
                        <p>Get daily updates on the most important tech developments</p>
                    </div>
                    <div className="feature">
                        <h3>Programming Tips</h3>
                        <p>Learn new coding techniques and best practices</p>
                    </div>
                    <div className="feature">
                        <h3>Industry Insights</h3>
                        <p>Deep dives into tech trends and market analysis</p>
                    </div>
                </section>

                <section className="newsletter-section">
                    <h2>Subscribe to Our Newsletter</h2>
                    <p>Join thousands of tech enthusiasts who receive our weekly updates</p>

                    {error && (
                        <div className="error-message">
                            <strong>Error:</strong> {error}
                        </div>
                    )}

                    {success && (
                        <div className="success-message">
                            <strong>Success!</strong> You have been subscribed to our newsletter.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="newsletter-form">
                        <div className="input-group">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={isAuthenticated ? "Your registered email" : "Enter your email address"}
                                required
                                disabled={isAuthenticated || loading}
                            />
                            <button type="submit" disabled={loading}>
                                {loading ? 'Subscribing...' : 'Subscribe'}
                            </button>
                        </div>
                    </form>

                    <div className="privacy-note">
                        <p>We respect your privacy. Unsubscribe at any time.</p>
                    </div>
                </section>
            </main>

            <footer className="footer">
                <p>&copy; 2024 Tech Insights. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage; 