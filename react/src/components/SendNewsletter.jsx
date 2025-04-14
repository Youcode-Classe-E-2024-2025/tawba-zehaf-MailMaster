import React, { useState } from 'react';
import { api } from '../services/api';

const SendNewsletter = () => {
    const [newsletterData, setNewsletterData] = useState({
        subject: '',
        content: '',
        scheduled_at: null
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewsletterData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await api.sendNewsletter(newsletterData);
            setSuccess(true);
            setNewsletterData({
                subject: '',
                content: '',
                scheduled_at: null
            });
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="newsletter-form-container">
            <h2>Send Newsletter</h2>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">Newsletter sent successfully!</div>}

            <form onSubmit={handleSubmit} className="newsletter-form">
                <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={newsletterData.subject}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter newsletter subject"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        name="content"
                        value={newsletterData.content}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter newsletter content"
                        rows="10"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="scheduled_at">Schedule Send (Optional)</label>
                    <input
                        type="datetime-local"
                        id="scheduled_at"
                        name="scheduled_at"
                        value={newsletterData.scheduled_at || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit" disabled={loading} className="submit-button">
                    {loading ? 'Sending...' : 'Send Newsletter'}
                </button>
            </form>
        </div>
    );
};

export default SendNewsletter; 