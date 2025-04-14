const API_BASE_URL = 'http://localhost:8000/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error:', {
            status: response.status,
            statusText: response.statusText,
            errorData
        });
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
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

    // Newsletter Operations
    sendNewsletter: async (newsletterData) => {
        try {
            console.log('Sending newsletter:', newsletterData);
            const response = await fetch(`${API_BASE_URL}/newsletters/send`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(newsletterData),
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('Newsletter sending error:', {
                    status: response.status,
                    statusText: response.statusText,
                    errorData
                });
                throw new Error(errorData.message || 'Failed to send newsletter');
            }
            
            const data = await response.json();
            console.log('Newsletter sent successfully:', data);
            return data;
        } catch (error) {
            console.error('Network error:', error);
            throw error;
        }
    },

    // Newsletter Subscription
    subscribeToNewsletter: async (email) => {
        try {
            console.log('Attempting to subscribe with email:', email);
            console.log('API Base URL:', API_BASE_URL);
            
            const response = await fetch(`${API_BASE_URL}/subscribers/public`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email }),
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('Subscription error:', {
                    status: response.status,
                    statusText: response.statusText,
                    errorData
                });
                throw new Error(errorData.message || 'Failed to subscribe');
            }
            
            const data = await response.json();
            console.log('Subscription successful:', data);
            return data;
        } catch (error) {
            console.error('Network error:', error);
            if (error.message.includes('Failed to fetch')) {
                throw new Error('Unable to connect to the server. Please make sure the backend server is running at http://localhost:8000');
            }
            throw error;
        }
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

    async updateSubscriberStatus(subscriberId, status) {
        try {
            const response = await fetch(`${API_BASE_URL}/subscribers/${subscriberId}/status`, {
                method: 'PATCH',
                headers: getHeaders(),
                body: JSON.stringify({ status }),
            });

            if (!response.ok) {
                throw new Error('Failed to update subscriber status');
            }

            return await response.json();
        } catch (error) {
            console.error('Error updating subscriber status:', error);
            throw error;
        }
    },

    async getSubscribers() {
        try {
            const response = await fetch(`${API_BASE_URL}/subscribers`, {
                method: 'GET',
                headers: getHeaders(),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch subscribers');
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching subscribers:', error);
            throw error;
        }
    },
}; 