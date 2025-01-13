import React, { Component } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { fetchPackages } from '../services/api';
import { saveAs } from 'file-saver';

class Package extends Component {
    constructor(props) {
        super(props);
        this.state = {
            packages: [],
        };
    }

    componentDidMount() {
        // Simulate fetching data
        fetchPackages().then((data) => this.setState({ packages: data }));
    }

    downloadReport = () => {
        const csvContent = [
            ['ID', 'Created At', 'Weight (lbs)', 'Shipping Dimensions', 'Sales Order ID'],
            ...this.state.packages.map(pkg => [
                pkg.id,
                new Date(pkg.created_at).toLocaleString(),
                pkg.weight,
                pkg.shipping_dimensions,
                pkg.sales_order
            ]),
        ].map(e => e.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'packages_report.csv');
    };

    render() {
        const columns = [
            { field: 'id', headerName: 'ID', width: 90 },
            { field: 'created_at', headerName: 'Created At', width: 180, valueFormatter: ({ value }) => new Date(value).toLocaleString() },
            { field: 'weight', headerName: 'Weight (lbs)', width: 150 },
            { field: 'shipping_dimensions', headerName: 'Shipping Dimensions', width: 200 },
            { field: 'sales_order', headerName: 'Sales Order ID', width: 150 },
        ];

        const rows = this.state.packages.map((pkg, index) => ({ id: pkg.id, ...pkg }));

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

export default Package;
