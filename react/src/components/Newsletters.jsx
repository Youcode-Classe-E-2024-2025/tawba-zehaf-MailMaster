import { useState, useEffect } from 'react';
import { api } from '../services/api';

const Newsletters = () => {
    const [newsletters, setNewsletters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newNewsletter, setNewNewsletter] = useState({
        title: '',
        content: '',
        status: 'draft'
    });

    useEffect(() => {
        loadNewsletters();
    }, []);

    const loadNewsletters = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await api.getNewsletters();
            setNewsletters(data);
        } catch (error) {
            setError('Failed to load newsletters. Please try again later.');
            console.error('Error loading newsletters:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            // Validate required fields
            if (!newNewsletter.title.trim() || !newNewsletter.content.trim()) {
                throw new Error('Title and content are required');
            }

            const response = await api.createNewsletter(newNewsletter);
            console.log('Newsletter created:', response);

            // Reset form
            setNewNewsletter({
                title: '',
                content: '',
                status: 'draft'
            });

            // Reload newsletters
            await loadNewsletters();
        } catch (error) {
            console.error('Error creating newsletter:', error);
            setError(error.message || 'Failed to create newsletter. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewNewsletter(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="newsletters-container">
            <h2>Newsletters</h2>

            {error && (
                <div className="error-message">
                    <strong>Error:</strong> {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="newsletter-form">
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={newNewsletter.title}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter newsletter title"
                        disabled={loading}
                    />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea
                        name="content"
                        value={newNewsletter.content}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter newsletter content"
                        disabled={loading}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Newsletter'}
                </button>
            </form>

            <div className="newsletters-list">
                <h3>Existing Newsletters</h3>
                {loading ? (
                    <div className="loading">Loading newsletters...</div>
                ) : newsletters.length === 0 ? (
                    <div className="no-newsletters">No newsletters found.</div>
                ) : (
                    newsletters.map((newsletter) => (
                        <div key={newsletter.id} className="newsletter-item">
                            <h4>{newsletter.title}</h4>
                            <p className="content">{newsletter.content}</p>
                            <div className="newsletter-meta">
                                <span className="status">Status: {newsletter.status}</span>
                                <span className="date">Created: {new Date(newsletter.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Newsletters; 