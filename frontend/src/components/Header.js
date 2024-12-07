import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Logout from './Logout';

const Header = ({ onLogout, isAuthenticated }) => {
    return (
        <Fragment>
            <header className="header d-flex justify-content-between align-items-center p-3 bg-primary text-white">
                <div className="header-title h4 m-0">Inventory Management System</div>
                {isAuthenticated && <Logout onLogout={onLogout} />}
            </header>
        </Fragment>
    );
};

// Prop types validation for better maintainability
Header.propTypes = {
    onLogout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

export default Header;
