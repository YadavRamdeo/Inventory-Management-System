import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDashboardOpen: true,  // Dashboard submenu is open by default
        };

        // Binding methods
        this.toggleDashboardMenu = this.toggleDashboardMenu.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    // Toggle the Dashboard submenu
    toggleDashboardMenu() {
        this.setState((prevState) => ({
            isDashboardOpen: !prevState.isDashboardOpen,
        }));

        // Load the Pie Chart view by default when Dashboard is clicked
        this.props.setView('pieChart');
    }

    // Handle button clicks to set the view
    handleClick(view) {
        this.props.setView(view);
    }

    render() {
        const { isDashboardOpen } = this.state;
        console.log(this.props, "this.state")

        return React.createElement(
            Fragment,
            null,
            React.createElement(
                'aside',
                null,
                // Dashboard Button with Submenu Toggle
                React.createElement(
                    'button',
                    { onClick: this.toggleDashboardMenu },
                    `Dashboard ${isDashboardOpen ? '▼' : '▶'}`
                ),
                // Dashboard Submenu
                isDashboardOpen &&
                (this.props.isAdminLogin ? React.createElement(
                    'div',
                    { className: 'submenu' },
                    React.createElement(
                        'button',
                        { onClick: () => this.handleClick('inventory') },
                        'Inventory Table'
                    ),
                    React.createElement(
                        'button',
                        { onClick: () => this.handleClick('view') },
                        'View Item'
                    ),
                    React.createElement(
                        'button',
                        { onClick: () => this.handleClick('add') },
                        'Add Item'
                    ),
                    React.createElement(
                        'button',
                        { onClick: () => this.handleClick('update') },
                        'Update Item'
                    ),
                    React.createElement(
                        'button',
                        { onClick: () => this.handleClick('delete') },
                        'Delete Item'
                    ),
                    React.createElement(
                        'button',
                        { onClick: () => this.handleClick('pieChart') },
                        'Pie Chart'
                    )
                ) :
                    React.createElement(
                        'div',
                        { className: 'submenu' },
                        React.createElement(
                            'button',
                            { onClick: () => this.handleClick('inventory') },
                            'Inventory Table'
                        ),
                        React.createElement(
                            'button',
                            { onClick: () => this.handleClick('view') },
                            'View Item'
                        ),

                        React.createElement(
                            'button',
                            { onClick: () => this.handleClick('pieChart') },
                            'Pie Chart'
                        )
                    )),
                // Inventory Catalog Button (Simple)
                this.props.isAdminLogin ?
                    React.createElement(
                        'button',
                        { onClick: () => this.handleClick('inventoryCatalog') },
                        'Inventory Catalog'
                    ) : "",
                // Main Navigation Links
                React.createElement(
                    'button',
                    { onClick: () => this.handleClick('purchaseOrders') },
                    'Purchase Orders'
                ),
                React.createElement(
                    'button',
                    { onClick: () => this.handleClick('salesOrders') },
                    'Sales Orders'
                ),
                React.createElement(
                    'button',
                    { onClick: () => this.handleClick('package') },
                    'Package'
                ),
                React.createElement(
                    'button',
                    { onClick: () => this.handleClick('shipment') },
                    'Shipment'
                ),
                React.createElement(
                    'button',
                    { onClick: () => this.handleClick('reports') },
                    'Reports'
                ),
                React.createElement(
                    'button',
                    { onClick: () => this.handleClick('contactUs') },
                    'Contact Us'
                )
            )
        );
    }
}

Sidebar.propTypes = {
    setView: PropTypes.func.isRequired,
};

export default Sidebar;
