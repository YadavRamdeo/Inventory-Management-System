import React, { Component } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { fetchShipments } from '../services/api';
import { saveAs } from 'file-saver';

class Shipment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shipments: [],
        };
    }

    componentDidMount() {
        // Fetch shipments and update the state
        fetchShipments().then((data) => this.setState({ shipments: data }));
    }

    downloadReport = () => {
        const csvContent = [
            ['ID', 'Tracking Number', 'Shipping Method', 'Customer', 'Associated Package ID'],
            ...this.state.shipments.map(shipment => [
                shipment.id,
                shipment.tracking_number,
                shipment.shipping_method,
                shipment.customer,
                shipment.associated_package
            ]),
        ].map(e => e.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'shipments_report.csv');
    };

    render() {
        const columns = [
            { field: 'id', headerName: 'ID', width: 90 },
            { field: 'tracking_number', headerName: 'Tracking Number', width: 200 },
            { field: 'shipping_method', headerName: 'Shipping Method', width: 180 },
            { field: 'customer', headerName: 'Customer', width: 200 },
            { field: 'associated_package', headerName: 'Associated Package ID', width: 180 },
        ];

        const rows = this.state.shipments.map((shipment, index) => ({ id: shipment.id, ...shipment }));

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

export default Shipment;
