import React, { Component } from 'react';
import { login } from '../services/api';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: null,
            isAdminLogin: true, // Tracks whether it's Admin or User Login form
        };
    }

    // Handle form input changes
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    // Toggle between Admin and User login forms
    toggleLoginForm = () => {
        this.setState((prevState) => ({ isAdminLogin: !prevState.isAdminLogin }));
    };

    // Handle form submission
    handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = this.state;
        const role = this.state.isAdminLogin ? 'Admin' : 'User';

        try {
            // Call the login function with username, password, and role
            const response = await login(username, password, role);

            const { access, refresh } = response;

            // Save tokens to localStorage
            localStorage.setItem('accessToken', access);
            localStorage.setItem('isAdminLogin', this.state?.isAdminLogin)
            localStorage.setItem('refreshToken', refresh);

            alert(`${role} Login Successful!`);

            // Clear the form after successful login
            this.setState({
                username: '',
                password: '',
                error: null,
            });

            // Redirect or trigger a callback if needed
            if (this.props.onLogin) {
                this.props.onLogin();
            }
        } catch (error) {
            this.setState({ error: 'Invalid username or password.' });
        }
    };

    render() {
        const { username, password, error, isAdminLogin } = this.state;

        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    backgroundColor: '#f4f4f4',
                }}
            >
                <div
                    style={{
                        backgroundColor: '#fff',
                        padding: '40px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        width: '400px',
                        textAlign: 'center',
                    }}
                >
                    <h2 style={{ color: isAdminLogin ? '#4CAF50' : '#007BFF', marginBottom: '20px' }}>
                        {isAdminLogin ? 'Admin Login' : 'User Login'}
                    </h2>
                    <form onSubmit={this.handleSubmit} style={{ textAlign: 'left' }}>
                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={this.handleChange}
                                placeholder="Enter your username"
                                required
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc',
                                }}
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={this.handleChange}
                                placeholder="Enter your password"
                                required
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc',
                                }}
                            />
                        </div>
                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                padding: '10px',
                                backgroundColor: isAdminLogin ? '#4CAF50' : '#007BFF',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '16px',
                            }}
                        >
                            {isAdminLogin ? 'Admin Login' : 'User Login'}
                        </button>
                    </form>
                    {error && (
                        <div style={{ marginTop: '15px', color: 'red', fontSize: '14px' }}>
                            <strong>{error}</strong>
                        </div>
                    )}
                    {/* Hyperlink to switch between Admin and User login forms */}
                    <p style={{ marginTop: '20px' }}>
                        {isAdminLogin ? (
                            <a href="#" onClick={this.toggleLoginForm} style={{ color: '#007BFF', textDecoration: 'none' }}>
                                Go to User Login
                            </a>
                        ) : (
                            <a href="#" onClick={this.toggleLoginForm} style={{ color: '#4CAF50', textDecoration: 'none' }}>
                                Go to Admin Login
                            </a>
                        )}
                    </p>
                </div>
            </div>
        );
    }
}

export default Login;
