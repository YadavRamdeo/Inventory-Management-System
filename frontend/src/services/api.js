import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

// Inventory and Item management functions
export const getItems = () => axios.get(`${API_URL}items/`);
export const addItem = (itemData) => axios.post(`${API_URL}items/`, itemData);
export const updateItem = (id, itemData) => axios.put(`${API_URL}items/${id}/`, itemData);
export const deleteItem = (id) => axios.delete(`${API_URL}items/${id}/`);

export const inventory = () => axios.get(`${API_URL}inventory/`);


export const fetchInventory = async (country = '') => {
    const API_BASE_URL = `${API_URL}inventory/`;
    const url = country ? `${API_BASE_URL}?country=${encodeURIComponent(country)}` : API_BASE_URL;

    try {
        console.log(url);
        // const response = await fetch(url);
        const response = await axios.get(url);
        // console.log(response.json());
        return await response.data;
    } catch (error) {
        console.error('Error fetching inventory data:', error);
        throw error;
    }
};


// Set up Axios interceptor for automatic token refresh
axios.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        // Check if the error is due to an expired token and retry if necessary
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }

                // Request a new access token using the refresh token
                const response = await axios.post(`${API_URL}token/refresh/`, { refresh: refreshToken });
                const { access: newAccessToken, refresh: newRefreshToken } = response.data;

                // Store the new tokens
                localStorage.setItem('accessToken', newAccessToken);
                if (newRefreshToken) {
                    localStorage.setItem('refreshToken', newRefreshToken);
                }

                // Update the Authorization header and retry the original request
                axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                return axios(originalRequest);
            } catch (err) {
                console.error('Token refresh failed:', err);
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

// Authentication functions
export const login = async (username, password) => {
    try {
        return await axios.post(`${API_URL}token/`, { username, password });
    } catch (error) {
        console.error('Login failed:', error.response ? error.response.data : error.message);
        return await Promise.reject(new Error('Invalid credentials. Please try again.'));
    }
};

export const validToken = async (refreshToken) => {
    if (refreshToken) {
        try {
            return await axios.post(`${API_URL}token/auth`, { refresh: refreshToken });
        } catch (error) {
            console.error('Token validation failed:', error.response ? error.response.data : error.message);
            return await Promise.reject(new Error('Invalid token. Please log in again.'));
        }
    } else {
        return Promise.reject(new Error('No valid token. Please log in again.'));
    }
};

export const logout = async (refreshToken) => {
    if (!refreshToken) {
        return Promise.reject(new Error('No refresh token provided'));
    }

    try {
        return await axios.post(
            `${API_URL}token/logout/`,
            { refresh: refreshToken },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch (error) {
        console.error('Logout failed:', error.response ? error.response.data : error.message);
        return await Promise.reject(new Error('Logout failed. Please try again.'));
    }
};
