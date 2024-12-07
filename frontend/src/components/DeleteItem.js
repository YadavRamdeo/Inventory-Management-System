import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { deleteItem } from '../services/api';

class DeleteItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            error: null,
            successMessage: null,
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { id } = this.state;

        // Reset error and success messages before making the API call
        this.setState({ error: null, successMessage: null });

        // Make the API request to delete the item
        deleteItem(id)
            .then(() => {
                this.setState({
                    id: '',
                    successMessage: 'Item deleted successfully!',
                });
                if (this.props.onItemDeleted) {
                    this.props.onItemDeleted();
                }
            })
            .catch((error) => {
                this.setState({ error: 'Failed to delete item. Please try again.' });
            });
    };

    render() {
        const { id, error, successMessage } = this.state;

        return (
            <Fragment>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Delete Item</h2>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: '15px'
                }}>
                    <form onSubmit={this.handleSubmit} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <input
                            type="text"
                            name="id"
                            value={id}
                            onChange={this.handleChange}
                            placeholder="Item ID"
                            required
                        />
                        <button type="submit">Delete Item</button>
                    </form>
                    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            </Fragment>
        );
    }
}

// Prop types validation for better maintainability
DeleteItem.propTypes = {
    onItemDeleted: PropTypes.func,
};

export default DeleteItem;
