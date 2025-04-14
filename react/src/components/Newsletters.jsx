import { useState, useEffect } from 'react';
import { api } from '../services/api';

const Newsletters = () => {
    const [newsletters, setNewsletters] = useState([]);
    const [newNewsletter, setNewNewsletter] = useState({
        subject: '',
        content: '',
        status: 'draft'
    });

    useEffect(() => {
        loadNewsletters();
    }, []);

    const loadNewsletters = async () => {
        try {
            const data = await api.getNewsletters();
            setNewsletters(data);
        } catch (error) {
            console.error('Error loading newsletters:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.createNewsletter(newNewsletter);
            setNewNewsletter({ subject: '', content: '', status: 'draft' });
            loadNewsletters();
        } catch (error) {
            console.error('Error creating newsletter:', error);
        }
    };

    return (
        <div className="newsletters-container">
            <h2>Newsletters</h2>

            <form onSubmit={handleSubmit} className="newsletter-form">
                <div>
                    <label>Subject:</label>
                    <input
                        type="text"
                        value={newNewsletter.subject}
                        onChange={(e) => setNewNewsletter({ ...newNewsletter, subject: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea
                        value={newNewsletter.content}
                        onChange={(e) => setNewNewsletter({ ...newNewsletter, content: e.target.value })}
                        required
                    />
                </div>
                <button type="submit">Create Newsletter</button>
            </form>

            <div className="newsletters-list">
                <h3>Existing Newsletters</h3>
                {newsletters.map((newsletter) => (
                    <div key={newsletter.id} className="newsletter-item">
                        <h4>{newsletter.subject}</h4>
                        <p>{newsletter.content}</p>
                        <p>Status: {newsletter.status}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Newsletters; 