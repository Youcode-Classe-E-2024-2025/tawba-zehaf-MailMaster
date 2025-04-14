import { useState } from 'react';
import { api } from '../services/api';

const Subscribe = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

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

    return (
        <div className="subscribe-container">
            <h2>Subscribe to Our Newsletter</h2>

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

            <form onSubmit={handleSubmit} className="subscribe-form">
                <div>
                    <label htmlFor="email">Email Address:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email address"
                        disabled={loading}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Subscribing...' : 'Subscribe'}
                </button>
            </form>

            <div className="subscribe-info">
                <p>Stay updated with our latest news and offers!</p>
                <p>We respect your privacy and will never share your email address.</p>
            </div>
        </div>
    );
};

export default Subscribe; 