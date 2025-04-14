const API_BASE_URL = 'http://localhost:8000/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
    }
    return data;
};

// Helper function to get headers with auth token
const getHeaders = () => {
    const token = localStorage.getItem('auth_token');
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
};

export const api = {
    // Auth
    login: async (credentials) => {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(credentials),
        });
        const data = await handleResponse(response);
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('user_email', credentials.email);
        return data;
    },

    register: async (userData) => {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(userData),
        });
        const data = await handleResponse(response);
        localStorage.setItem('user_email', userData.email);
        return data;
    },

    // Newsletter Subscription
    subscribeToNewsletter: async (email) => {
        const response = await fetch(`${API_BASE_URL}/subscribers`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ email }),
        });
        return handleResponse(response);
    },

    // Campaigns
    getCampaigns: async () => {
        const response = await fetch(`${API_BASE_URL}/campaigns`, {
            headers: getHeaders(),
        });
        return handleResponse(response);
    },

    createCampaign: async (campaignData) => {
        const response = await fetch(`${API_BASE_URL}/campaigns`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(campaignData),
        });
        return handleResponse(response);
    },

    // Subscribers
    getSubscribers: async () => {
        const response = await fetch(`${API_BASE_URL}/subscribers`, {
            headers: getHeaders(),
        });
        return handleResponse(response);
    },

    createSubscriber: async (subscriberData) => {
        const response = await fetch(`${API_BASE_URL}/subscribers`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(subscriberData),
        });
        return handleResponse(response);
    },

    // Newsletters
    getNewsletters: async () => {
        const response = await fetch(`${API_BASE_URL}/newsletters`, {
            headers: getHeaders(),
        });
        return handleResponse(response);
    },

    createNewsletter: async (newsletterData) => {
        try {
            console.log('Creating newsletter with data:', newsletterData);
            const response = await fetch(`${API_BASE_URL}/newsletters`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(newsletterData),
            });
            console.log('Response status:', response.status);
            const data = await handleResponse(response);
            console.log('Newsletter created successfully:', data);
            return data;
        } catch (error) {
            console.error('Error creating newsletter:', error);
            throw error;
        }
    },

    // Logout
    logout: () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_email');
    },
}; 