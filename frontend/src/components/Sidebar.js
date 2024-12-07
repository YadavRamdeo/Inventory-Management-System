import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class Sidebar extends Component {
    handleClick = (view) => {
        this.props.setView(view);
    };
    setView = (view) => {
        this.setState({ view });
    };
    render() {
        return (
            <Fragment>
                <aside>
                    <button onClick={() => this.handleClick('dashboard')}>Dashboard</button>
                    <button onClick={() => this.handleClick('view')}>View Item</button>
                    <button onClick={() => this.handleClick('inventory')}>InventoryTable</button>
                    <button onClick={() => this.handleClick('add')}>Add Item</button>
                    <button onClick={() => this.handleClick('update')}>Update Item</button>
                    <button onClick={() => this.handleClick('delete')}>Delete Item</button>

                </aside>
            </Fragment>
        );
    }
}

// Prop types validation for better maintainability
Sidebar.propTypes = {
    setView: PropTypes.func.isRequired,
};

export default Sidebar;

