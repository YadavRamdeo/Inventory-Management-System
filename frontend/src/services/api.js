import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

// Create an instance of axios with base URL and headers
const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to set Authorization token for protected routes
const setAuthToken = (token) => {
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common['Authorization'];
    }
};

// ===========================
// Authentication Functions
// ===========================

// Login Function
export const login = async (username, password, role) => {
    try {
        // Pass the role as part of the request body
        const response = await axiosInstance.post('token/', { username, password, role });
        setAuthToken(response.data.access);
        return response.data;
    } catch (error) {
        console.error('Login failed:', error.response ? error.response.data : error.message);
        throw new Error('Invalid credentials. Please try again.');
    }
};

// Logout Function
export const logout = async (refreshToken) => {
    if (!refreshToken) {
        throw new Error('No refresh token provided');
    }

    try {
        await axiosInstance.post('token/logout/', { refresh: refreshToken });
        setAuthToken(null);
        console.log('Logout successful.');
    } catch (error) {
        console.error('Logout failed:', error.response ? error.response.data : error.message);
        throw new Error('Logout failed. Please try again.');
    }
};

// ===========================
// Inventory Management Functions
// ===========================

export const getItems = async () => {
    try {
        const response = await axiosInstance.get('items/');
        return response.data;
    } catch (error) {
        console.error('Error fetching items:', error.message);
        throw error;
    }
};

export const addItem = async (itemData) => {
    try {
        const response = await axiosInstance.post('items/', itemData);
        return response.data;
    } catch (error) {
        console.error('Error adding item:', error.message);
        throw error;
    }
};

export const updateItem = async (id, itemData) => {
    try {
        const response = await axiosInstance.put(`items/${id}/`, itemData);
        return response.data;
    } catch (error) {
        console.error('Error updating item:', error.message);
        throw error;
    }
};

export const deleteItem = async (id) => {
    try {
        await axiosInstance.delete(`items/${id}/`);
        return { message: 'Item deleted successfully' };
    } catch (error) {
        console.error('Error deleting item:', error.message);
        throw error;
    }
};

// ===========================
// Inventory by Country
// ===========================

export const fetchInventory = async (country = '') => {
    try {
        const url = country ? `inventory/?country=${encodeURIComponent(country)}` : 'inventory/';
        const response = await axiosInstance.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching inventory data:', error.message);
        throw error;
    }
};

// ===========================
// Ship Inventory API
// ===========================

export const fetchInventoryCatalog = async () => {
    try {
        const response = await axiosInstance.get('inventory-catalog/');
        return response.data;
    } catch (error) {
        console.error('Error fetching Inventory Catalog:', error.message);
        throw error;
    }
};

export const addInventoryCatalog = async (inventoryData) => {
    try {
        const response = await axiosInstance.post('inventory-catalog/', inventoryData);
        return response.data;
    } catch (error) {
        console.error('Error adding Inventory Catalog:', error.message);
        throw error;
    }
};

// ===========================
// Purchase Orders API
// ===========================

export const fetchPurchaseOrders = async () => {
    try {
        const response = await axiosInstance.get('purchase-orders/');
        return response.data;
    } catch (error) {
        console.error('Error fetching purchase orders:', error.message);
        throw error;
    }
};

export const addPurchaseOrder = async (orderData) => {
    try {
        const response = await axiosInstance.post('purchase-orders/', orderData);
        return response.data;
    } catch (error) {
        console.error('Error adding purchase order:', error.message);
        throw error;
    }
};

// ===========================
// Sales Orders API
// ===========================

export const fetchSalesOrders = async () => {
    try {
        const response = await axiosInstance.get('sales-orders/');
        return response.data;
    } catch (error) {
        console.error('Error fetching sales orders:', error.message);
        throw error;
    }
};

export const addSalesOrder = async (orderData) => {
    try {
        const response = await axiosInstance.post('sales-orders/', orderData);
        return response.data;
    } catch (error) {
        console.error('Error adding sales order:', error.message);
        throw error;
    }
};

// ===========================
// Package API
// ===========================

export const fetchPackages = async () => {
    try {
        const response = await axiosInstance.get('packages/');
        return response.data;
    } catch (error) {
        console.error('Error fetching packages:', error.message);
        throw error;
    }
};

export const addPackage = async (packageData) => {
    try {
        const response = await axiosInstance.post('packages/', packageData);
        return response.data;
    } catch (error) {
        console.error('Error adding package:', error.message);
        throw error;
    }
};

// ===========================
// Shipment API
// ===========================

export const fetchShipments = async () => {
    try {
        const response = await axiosInstance.get('shipments/');
        return response.data;
    } catch (error) {
        console.error('Error fetching shipments:', error.message);
        throw error;
    }
};

export const addShipment = async (shipmentData) => {
    try {
        const response = await axiosInstance.post('shipments/', shipmentData);
        return response.data;
    } catch (error) {
        console.error('Error adding shipment:', error.message);
        throw error;
    }
};

// ===========================
// Reports API
// ===========================

export const fetchReports = async () => {
    try {
        const response = await axiosInstance.get('reports/');
        return response.data;
    } catch (error) {
        console.error('Error fetching reports:', error.message);
        throw error;
    }
};

export const addReport = async (reportData) => {
    try {
        const response = await axiosInstance.post('reports/', reportData);
        return response.data;
    } catch (error) {
        console.error('Error adding report:', error.message);
        throw error;
    }
};

// ===========================
// Contact Us API
// ===========================

export const fetchContactUsMessages = async () => {
    try {
        const response = await axiosInstance.get('contact-us/');
        return response.data;
    } catch (error) {
        console.error('Error fetching contact us messages:', error.message);
        throw error;
    }
};

export const addContactUsMessage = async (messageData) => {
    try {
        const response = await axiosInstance.post('contact-us/', messageData);
        return response.data;
    } catch (error) {
        console.error('Error adding contact us message:', error.message);
        throw error;
    }
};

// ===========================
// Purchase Orders for Shipments
// ===========================

export const fetchPurchaseOrdersForShipments = async () => {
    try {
        const response = await axiosInstance.get('purchase-orders/');
        return response.data;
    } catch (error) {
        console.error('Error fetching purchase orders for shipments:', error.message);
        throw error;
    }
};
