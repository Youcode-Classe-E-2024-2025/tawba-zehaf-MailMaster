import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

const SubscribersList = () => {
    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubscribers = async () => {
            try {
                const response = await api.getSubscribers();
                setSubscribers(response);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch subscribers');
                setLoading(false);
            }
        };

        fetchSubscribers();
    }, []);

    const handleStatusChange = async (subscriber) => {
        try {
            const newStatus = subscriber.status === 'active' ? 'inactive' : 'active';
            await api.updateSubscriberStatus(subscriber.id, newStatus);

            setSubscribers(subscribers.map(s =>
                s.id === subscriber.id
                    ? { ...s, status: newStatus }
                    : s
            ));
        } catch (error) {
            setError('Failed to update subscriber status');
        }
    };

    if (loading) {
        return <div className="loading">Loading subscribers...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="subscribers-container">
            <h2>Newsletter Subscribers</h2>
            <div className="subscribers-stats">
                <div className="stat-card">
                    <h3>Total Subscribers</h3>
                    <p>{subscribers.length}</p>
                </div>
                <div className="stat-card">
                    <h3>Active Subscribers</h3>
                    <p>{subscribers.filter(s => s.status === 'active').length}</p>
                </div>
            </div>

            <div className="subscribers-table">
                <table>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Subscription Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscribers.map((subscriber) => (
                            <tr key={subscriber.id}>
                                <td>{subscriber.email}</td>
                                <td>
                                    <span className={`status-badge ${subscriber.status}`}>
                                        {subscriber.status}
                                    </span>
                                </td>
                                <td>{new Date(subscriber.created_at).toLocaleDateString()}</td>
                                <td>
                                    <button
                                        className="action-button"
                                        onClick={() => handleStatusChange(subscriber)}
                                    >
                                        {subscriber.status === 'active' ? 'Deactivate' : 'Activate'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SubscribersList; 