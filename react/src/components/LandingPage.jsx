import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

const LandingPage = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await api.subscribeToNewsletter(email);
            setSuccess(true);
            setEmail('');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="landing-page">
            <header className="landing-header">
                <div className="header-content">
                    <h1>MailMaster</h1>
                    <nav className="auth-nav">
                        <Link to="/login" className="nav-link">Login</Link>
                        <Link to="/register" className="nav-button">Register</Link>
                    </nav>
                </div>
            </header>

            <section className="hero">
                <h2>Subscribe to Our Newsletter</h2>
                <p>Join thousands of tech enthusiasts who receive our weekly updates</p>
            </section>

            <main className="main-content">
                <div className="newsletter-section">
                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">Success! You have been subscribed to our newsletter.</div>}

                    <form onSubmit={handleSubmit} className="subscribe-form">
                        <div className="input-group">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address"
                                required
                            />
                            <button type="submit" disabled={loading}>
                                {loading ? 'Subscribing...' : 'Subscribe'}
                            </button>
                        </div>
                    </form>
                    <p className="privacy-note">We respect your privacy. Unsubscribe at any time.</p>
                </div>
            </main>

            <footer className="footer">
                <p>&copy; 2024 MailMaster. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage; 