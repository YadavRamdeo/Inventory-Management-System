import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { updateItem } from '../services/api';

class UpdateItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            quantity: '',
            price: '',
            error: null,
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { id, name, quantity, price } = this.state;
        const item = { name, quantity, price };

        // Make the API request to update the item
        updateItem(id, item)
            .then(() => {
                alert('Item updated successfully!');
                this.setState({ id: '', name: '', quantity: '', price: '' });
            })
            .catch((error) => {
                this.setState({ error: 'Failed to update item. Please try again.' });
            });
    };

    render() {
        const { id, name, quantity, price, error } = this.state;

        return (
            <Fragment>
                <h2 style={{ textAlign: 'center' }}>Update Item</h2>
                <div style={{ display: 'flex', justifyContent: 'center' }}> {/* Centering container */}
                    <form onSubmit={this.handleSubmit} style={{ display: 'inline-block' }}>
                        <input
                            type="text"
                            name="id"
                            value={id}
                            onChange={this.handleChange}
                            placeholder="Item ID"
                            required
                        />
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={this.handleChange}
                            placeholder="Item Name"
                            required
                        />
                        <input
                            type="number"
                            name="quantity"
                            value={quantity}
                            onChange={this.handleChange}
                            placeholder="Quantity"
                            required
                        />
                        <input
                            type="number"
                            name="price"
                            value={price}
                            onChange={this.handleChange}
                            placeholder="Price"
                            required
                        />
                        <button type="submit">Update Item</button>
                    </form>
                </div>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            </Fragment>
        );
    }
}

// Prop types validation for better maintainability
UpdateItem.propTypes = {
    onItemUpdated: PropTypes.func,
};

export default UpdateItem;
