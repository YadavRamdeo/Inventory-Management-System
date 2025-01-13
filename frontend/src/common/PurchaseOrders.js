import React, { Component } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { fetchPurchaseOrders } from '../services/api';
import { saveAs } from 'file-saver';

class PurchaseOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
        };
    }

    componentDidMount() {
        // Simulate fetching data
        fetchPurchaseOrders().then((data) => this.setState({ orders: data }));
    }

    downloadReport = () => {
        const csvContent = [
            ['ID', 'Supplier', 'Billing Address', 'Shipping Address', 'Shipping Method', 'Preferred Shipping Date', 'Quantity', 'Total Price'],
            ...this.state.orders.map(order => [
                order.id,
                order.supplier,
                order.billing_address,
                order.shipping_address,
                order.shipping_method,
                new Date(order.preferred_shipping_date).toLocaleString(),
                order.quantity,
                `$${order.total_price}`
            ]),
        ].map(e => e.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'purchase_orders_report.csv');
    };

    render() {
        const columns = [
            { field: 'id', headerName: 'ID', width: 90 },
            { field: 'supplier', headerName: 'Supplier', width: 150 },
            { field: 'billing_address', headerName: 'Billing Address', width: 200 },
            { field: 'shipping_address', headerName: 'Shipping Address', width: 200 },
            { field: 'shipping_method', headerName: 'Shipping Method', width: 150 },
            { field: 'preferred_shipping_date', headerName: 'Preferred Shipping Date', width: 180, valueFormatter: ({ value }) => new Date(value).toLocaleString() },
            { field: 'quantity', headerName: 'Quantity', width: 120 },
            { field: 'total_price', headerName: 'Total Price ($)', width: 150, valueFormatter: ({ value }) => `$${value}` },
        ];

        const rows = this.state.orders.map((order, index) => ({ id: order.id, ...order }));

        return (
            <div style={{ height: 600, width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.downloadReport}
                        size="small"
                    >
                        Download Report
                    </Button>
                </div>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10, 25, 50]}
                />
            </div>
        );
    }
}

export default PurchaseOrders;
