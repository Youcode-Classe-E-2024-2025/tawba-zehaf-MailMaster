import { useState, useEffect } from 'react';
import { api } from '../services/api';

const Subscribers = () => {
    const [subscribers, setSubscribers] = useState([]);
    const [newSubscriber, setNewSubscriber] = useState({
        name: '',
        email: '',
        status: 'active'
    });

    useEffect(() => {
        loadSubscribers();
    }, []);

    const loadSubscribers = async () => {
        try {
            const data = await api.getSubscribers();
            setSubscribers(data);
        } catch (error) {
            console.error('Error loading subscribers:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.createSubscriber(newSubscriber);
            setNewSubscriber({ name: '', email: '', status: 'active' });
            loadSubscribers();
        } catch (error) {
            console.error('Error creating subscriber:', error);
        }
    };

    return (
        <div className="subscribers-container">
            <h2>Subscribers</h2>

            <form onSubmit={handleSubmit} className="subscriber-form">
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={newSubscriber.name}
                        onChange={(e) => setNewSubscriber({ ...newSubscriber, name: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={newSubscriber.email}
                        onChange={(e) => setNewSubscriber({ ...newSubscriber, email: e.target.value })}
                        required
                    />
                </div>
                <button type="submit">Add Subscriber</button>
            </form>

            <div className="subscribers-list">
                <h3>Existing Subscribers</h3>
                {subscribers.map((subscriber) => (
                    <div key={subscriber.id} className="subscriber-item">
                        <h4>{subscriber.name}</h4>
                        <p>Email: {subscriber.email}</p>
                        <p>Status: {subscriber.status}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Subscribers; 