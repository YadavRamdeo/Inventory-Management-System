import React, { Component } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { fetchInventoryCatalog } from '../services/api';
import { saveAs } from 'file-saver';
import '../App.css';

class InventoryCatalog extends Component {
    state = {
        inventoryCatalog: [],
        filter: '',
        openDialog: false,
        dialogType: '',
        selectedItem: { name: '', sku: '', dimension: '', purchasing_price: '', selling_price: '', on_hand: '', units: '' },
    };

    componentDidMount() {
        fetchInventoryCatalog()
            .then(data => this.setState({ inventoryCatalog: data }))
            .catch(error => console.error('Error fetching inventory catalog:', error));
    }

    formatCurrency = (value) => {
        const numValue = Number(value);
        if (isNaN(numValue)) {
            return '$0.00';
        }
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(numValue);
    };

    formatDate = (dateString) => {
        if (!dateString) {
            return 'N/A';
        }
        const date = new Date(dateString);
        return !isNaN(date.getTime()) ? date.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }) : 'N/A';
    };

    downloadReport = () => {
        const csvContent = [
            ['Name', 'SKU', 'Dimension', 'Purchasing Price', 'Selling Price', 'On-Hand', 'Units', 'Updated'],
            ...this.state.inventoryCatalog.map(item => [
                item.name || 'N/A',
                item.sku || 'N/A',
                item.dimension || 'N/A',
                this.formatCurrency(item.purchasing_price),
                this.formatCurrency(item.selling_price),
                item.on_hand || 0,
                item.units || 'N/A',
                this.formatDate(item.updated_at),
            ]),
        ].map(e => e.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'inventory_catalog_report.csv');
    };

    handleFilterChange = (event) => {
        this.setState({ filter: event.target.value });
    };

    handleDialogOpen = (type, item = null) => {
        this.setState({
            openDialog: true,
            dialogType: type,
            selectedItem: item ? { ...item } : { name: '', sku: '', dimension: '', purchasing_price: '', selling_price: '', on_hand: '', units: '' },
        });
    };

    handleDialogClose = () => {
        this.setState({ openDialog: false });
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            selectedItem: { ...this.state.selectedItem, [name]: value },
        });
    };

    handleSave = () => {
        const { selectedItem, inventoryCatalog, dialogType } = this.state;
        if (dialogType === 'Add') {
            this.setState({
                inventoryCatalog: [...inventoryCatalog, { ...selectedItem, id: inventoryCatalog.length + 1 }],
            });
        } else if (dialogType === 'Edit') {
            this.setState({
                inventoryCatalog: inventoryCatalog.map(item => item.id === selectedItem.id ? selectedItem : item),
            });
        }
        this.handleDialogClose();
    };

    render() {
        const { filter, inventoryCatalog, openDialog, selectedItem } = this.state;

        const filteredRows = inventoryCatalog.filter(item =>
            item.name.toLowerCase().includes(filter.toLowerCase())
        );

        const columns = [
            { field: 'name', headerName: 'Name', width: 200 },
            { field: 'sku', headerName: 'SKU', width: 150 },
            { field: 'dimension', headerName: 'Dimension', width: 200 },
            {
                field: 'purchasing_price',
                headerName: 'Purchasing Price ($)',
                width: 150,
                valueFormatter: (params) => {
                    if (!params?.value) return '$0.00';
                    return this.formatCurrency(params.value);
                },
            },
            {
                field: 'selling_price',
                headerName: 'Selling Price ($)',
                width: 150,
                valueFormatter: (params) => {
                    if (!params?.value) return '$0.00';
                    return this.formatCurrency(params.value);
                },
            },
            { field: 'on_hand', headerName: 'On-Hand', width: 120 },
            { field: 'units', headerName: 'Units', width: 120 },
            {
                field: 'updated_at',
                headerName: 'Updated',
                width: 200,
                valueFormatter: (params) => {
                    if (!params?.value) return 'N/A';
                    return this.formatDate(params.value);
                },
            },
        ];

        const rows = filteredRows.map((item) => ({
            id: item.id,
            name: item.name,
            sku: item.sku,
            dimension: item.dimension,
            purchasing_price: Number(item.purchasing_price),
            selling_price: Number(item.selling_price),
            on_hand: item.on_hand,
            units: item.units,
            updated_at: item.updated_at,
        }));

        return (
            <div className="inventory-container" style={{ height: 600, width: '100%' }}>
                <div className="inventory-actions" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <TextField
                        label="Filter"
                        variant="outlined"
                        size="small"
                        value={filter}
                        onChange={this.handleFilterChange}
                    />
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => this.handleDialogOpen('Add')}
                            size="small"
                            style={{ marginRight: '10px' }}
                        >
                            New Item
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => this.handleDialogOpen('Edit', rows[0])} // Replace with actual selected row logic
                            size="small"
                        >
                            Edit
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.downloadReport}
                            size="small"
                            style={{ marginLeft: '10px' }}
                        >
                            Download Report
                        </Button>
                    </div>
                </div>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10, 25, 50]}
                    style={{ fontSize: '14px', fontFamily: 'Arial' }}
                />

                <Dialog open={openDialog} onClose={this.handleDialogClose}>
                    <DialogTitle>{this.state.dialogType} Item</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="name"
                            label="Name"
                            type="text"
                            fullWidth
                            value={selectedItem.name}
                            onChange={this.handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            name="sku"
                            label="SKU"
                            type="text"
                            fullWidth
                            value={selectedItem.sku}
                            onChange={this.handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            name="dimension"
                            label="Dimension"
                            type="text"
                            fullWidth
                            value={selectedItem.dimension}
                            onChange={this.handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            name="purchasing_price"
                            label="Purchasing Price"
                            type="number"
                            fullWidth
                            value={selectedItem.purchasing_price}
                            onChange={this.handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            name="selling_price"
                            label="Selling Price"
                            type="number"
                            fullWidth
                            value={selectedItem.selling_price}
                            onChange={this.handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            name="on_hand"
                            label="On-Hand"
                            type="number"
                            fullWidth
                            value={selectedItem.on_hand}
                            onChange={this.handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            name="units"
                            label="Units"
                            type="text"
                            fullWidth
                            value={selectedItem.units}
                            onChange={this.handleInputChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDialogClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSave} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default InventoryCatalog;
