const API_BASE_URL = 'http://localhost:8000/api';

export const api = {
    // Campaigns
    getCampaigns: async () => {
        const response = await fetch(`${API_BASE_URL}/campaigns`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
        return response.json();
    },

    createCampaign: async (campaignData) => {
        const response = await fetch(`${API_BASE_URL}/campaigns`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(campaignData),
        });
        return response.json();
    },

    // Subscribers
    getSubscribers: async () => {
        const response = await fetch(`${API_BASE_URL}/subscribers`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
        return response.json();
    },

    createSubscriber: async (subscriberData) => {
        const response = await fetch(`${API_BASE_URL}/subscribers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(subscriberData),
        });
        return response.json();
    },

    // Newsletters
    getNewsletters: async () => {
        const response = await fetch(`${API_BASE_URL}/newsletters`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
        return response.json();
    },

    createNewsletter: async (newsletterData) => {
        const response = await fetch(`${API_BASE_URL}/newsletters`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(newsletterData),
        });
        return response.json();
    },
}; 