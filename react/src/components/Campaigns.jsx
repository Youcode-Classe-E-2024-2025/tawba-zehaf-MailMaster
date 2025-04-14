import { useState, useEffect } from 'react';
import { api } from '../services/api';

const Campaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [newCampaign, setNewCampaign] = useState({
        title: '',
        content: '',
        status: 'draft'
    });

    useEffect(() => {
        loadCampaigns();
    }, []);

    const loadCampaigns = async () => {
        try {
            const data = await api.getCampaigns();
            setCampaigns(data);
        } catch (error) {
            console.error('Error loading campaigns:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.createCampaign(newCampaign);
            setNewCampaign({ title: '', content: '', status: 'draft' });
            loadCampaigns();
        } catch (error) {
            console.error('Error creating campaign:', error);
        }
    };

    return (
        <div className="campaigns-container">
            <h2>Campaigns</h2>

            <form onSubmit={handleSubmit} className="campaign-form">
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={newCampaign.title}
                        onChange={(e) => setNewCampaign({ ...newCampaign, title: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea
                        value={newCampaign.content}
                        onChange={(e) => setNewCampaign({ ...newCampaign, content: e.target.value })}
                        required
                    />
                </div>
                <button type="submit">Create Campaign</button>
            </form>

            <div className="campaigns-list">
                <h3>Existing Campaigns</h3>
                {campaigns.map((campaign) => (
                    <div key={campaign.id} className="campaign-item">
                        <h4>{campaign.title}</h4>
                        <p>{campaign.content}</p>
                        <p>Status: {campaign.status}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Campaigns; 