import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { addItem } from '../services/api';

class AddItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        const { name, quantity, price } = this.state;
        const item = { name, quantity, price };

        addItem(item)
            .then(() => {
                alert('Item added successfully!');
                this.setState({ name: '', quantity: '', price: '' });
            })
            .catch((error) => {
                this.setState({ error: 'Failed to add item. Please try again.' });
            });
    };

    render() {
        const { name, quantity, price, error } = this.state;

        return (
            <Fragment>
                <h2 style={{ textAlign: 'center' }}>Add Item</h2>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '10vh',
                }}>
                    <form onSubmit={this.handleSubmit} style={{ display: 'flex', gap: '10px', alignItems: 'center', marginLeft: '-50px' }}>
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
                        <button type="submit">Add Item</button>
                    </form>
                    {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
                </div>
            </Fragment>
        );
    }
}

// Prop types validation for better maintainability
AddItem.propTypes = {
    onItemAdded: PropTypes.func,
};

export default AddItem;
