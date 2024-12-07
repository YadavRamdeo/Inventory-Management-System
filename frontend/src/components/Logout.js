import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { logout } from '../services/api';

class Logout extends Component {
    constructor(props) {
        super(props);

        // Retrieve and decode the refresh token to get the expiry time
        const refreshToken = localStorage.getItem('refreshToken');
        let expiryTime = null;

        if (refreshToken) {
            try {
                const decodedToken = JSON.parse(atob(refreshToken.split('.')[1]));
                expiryTime = decodedToken.exp * 1000; // Convert to milliseconds
            } catch (error) {
                console.error('Failed to decode token:', error);
            }
        }

        this.state = {
            expiryTime,
            sessionTimeout: null,
        };
    }

    componentDidMount() {
        this.setSessionTimeout();
    }

    componentWillUnmount() {
        // Clear the timeout when the component is unmounted to avoid memory leaks
        if (this.state.sessionTimeout) {
            clearTimeout(this.state.sessionTimeout);
        }
    }

    setSessionTimeout = () => {
        const { expiryTime } = this.state;

        if (expiryTime) {
            const currentTime = Date.now();
            const timeUntilExpiry = expiryTime - currentTime;

            if (timeUntilExpiry > 0) {
                console.log('Session will expire in:', timeUntilExpiry / 1000, 'seconds');

                // Set a timeout to automatically log out the user when the session expires
                const timeout = setTimeout(() => {
                    this.handleLogout();
                }, timeUntilExpiry);

                // Save the timeout reference in the state
                this.setState({ sessionTimeout: timeout });
            } else {
                // If the token is already expired, log out immediately
                this.handleLogout();
            }
        }
    };

    handleLogout = () => {
        const refreshToken = localStorage.getItem('refreshToken');

        if (refreshToken) {
            logout(refreshToken)
                .then(() => {
                    // Clear tokens and notify parent component
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    this.props.onLogout();
                    console.log('Logout successful.');
                })
                .catch((error) => {
                    console.error('Logout failed:', error.response ? error.response.data : error.message);
                    alert('Logout failed. Please try again.');
                });
        } else {
            console.error('No refresh token found');
            this.props.onLogout();
        }
    };

    render() {
        return (
            <Fragment>
                <div className="logout-container">
                    <button className="logout-button" onClick={this.handleLogout}>Logout</button>
                </div>
            </Fragment>
        );
    }
}

// PropTypes validation for better maintainability
Logout.propTypes = {
    onLogout: PropTypes.func.isRequired,
};

export default Logout;
