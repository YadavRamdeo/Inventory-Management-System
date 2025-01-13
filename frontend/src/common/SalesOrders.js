import React, { Component } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { fetchSalesOrders } from '../services/api';
import { saveAs } from 'file-saver';

class SalesOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
        };
    }

    componentDidMount() {
        // Fetch sales orders and update the state
        fetchSalesOrders().then((data) => this.setState({ orders: data }));
    }

    downloadReport = () => {
        const csvContent = [
            ['ID', 'Customer', 'Contact Person', 'Shipping Address', 'Billing Address', 'Shipping Method', 'Preferred Shipping Date', 'Payment Terms', 'Order Total'],
            ...this.state.orders.map(order => [
                order.id,
                order.customer,
                order.contact_person,
                order.shipping_address,
                order.billing_address,
                order.shipping_method,
                new Date(order.preferred_shipping_date).toLocaleString(),
                order.payment_terms,
                `$${order.order_total}`
            ]),
        ].map(e => e.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'sales_orders_report.csv');
    };

    render() {
        const columns = [
            { field: 'id', headerName: 'ID', width: 90 },
            { field: 'customer', headerName: 'Customer', width: 200 },
            { field: 'contact_person', headerName: 'Contact Person', width: 180 },
            { field: 'shipping_address', headerName: 'Shipping Address', width: 250 },
            { field: 'billing_address', headerName: 'Billing Address', width: 250 },
            { field: 'shipping_method', headerName: 'Shipping Method', width: 150 },
            { field: 'preferred_shipping_date', headerName: 'Preferred Shipping Date', width: 180, valueFormatter: ({ value }) => new Date(value).toLocaleString() },
            { field: 'payment_terms', headerName: 'Payment Terms', width: 150 },
            { field: 'order_total', headerName: 'Order Total ($)', width: 150, valueFormatter: ({ value }) => `$${value}` },
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

export default SalesOrders;
