import React, { Component, Fragment } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { getItems } from '../services/api';
import { Container, Typography, TextField, InputAdornment, Button, Box, Grid, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

class ViewItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            filteredItems: [],
            searchQuery: '',
            error: null,
            filters: {
                minQuantity: '',
                maxQuantity: '',
                minPrice: '',
                maxPrice: '',
            },
        };
    }

    componentDidMount() {
        // Fetch items from API when component mounts
        getItems()
            .then((response) => {
                this.setState({ items: response.data, filteredItems: response.data });
            })
            .catch((error) => {
                this.setState({ error: 'Failed to load items. Please try again later.' });
                console.error('Error fetching items:', error);
            });
    }

    handleSearchChange = (event) => {
        const query = event.target.value?.toLowerCase();
        this.setState({ searchQuery: query }, this.applyFilters);
    };

    handleFilterChange = (field, value) => {
        this.setState(
            (prevState) => ({
                filters: {
                    ...prevState.filters,
                    [field]: value,
                },
            }),
            this.applyFilters
        );
    };

    applyFilters = () => {
        const { items, searchQuery, filters } = this.state;
        const { minQuantity, maxQuantity, minPrice, maxPrice } = filters;

        const filtered = items.filter((item) => {
            // Apply text search filter
            const matchesSearchQuery =
                item.name?.toLowerCase().includes(searchQuery) ||
                item.description?.toLowerCase().includes(searchQuery);

            // Apply attribute filters
            const matchesQuantity =
                (minQuantity === '' || item.quantity >= Number(minQuantity)) &&
                (maxQuantity === '' || item.quantity <= Number(maxQuantity));

            const matchesPrice =
                (minPrice === '' || item.price >= Number(minPrice)) &&
                (maxPrice === '' || item.price <= Number(maxPrice));

            return matchesSearchQuery && matchesQuantity && matchesPrice;
        });

        this.setState({ filteredItems: filtered });
    };

    handleDownload = () => {
        const { filteredItems } = this.state;
        const worksheet = XLSX.utils.json_to_sheet(filteredItems);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Items');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'items_report.xlsx');
    };

    render() {
        const { filteredItems, error, searchQuery, filters } = this.state;

        // Columns for the DataGrid
        const columns = [
            {
                field: 'id',
                headerName: 'ID',
                width: 100,
                headerAlign: 'center',
                renderCell: (params) => (
                    <div style={{ textAlign: 'center', width: '100%' }}>{params.value}</div>
                ),
            },
            {
                field: 'name',
                headerName: 'Name',
                width: 100,
                headerAlign: 'center',
                renderCell: (params) => (
                    <div style={{ textAlign: 'center', width: '100%' }}>{params.value}</div>
                ),
            },
            {
                field: 'quantity',
                headerName: 'Quantity',
                type: 'number',
                width: 100,
                headerAlign: 'center',
                renderCell: (params) => (
                    <div style={{ textAlign: 'center', width: '100%' }}>{params.value}</div>
                ),
            },
            {
                field: 'price',
                headerName: 'Price ($)',
                type: 'number',
                width: 100,
                headerAlign: 'center',
                renderCell: (params) => (
                    <div style={{ textAlign: 'center', width: '100%' }}>{params.value}</div>
                ),
            },
            {
                field: 'description',
                headerName: 'Description',
                width: 300,
                headerAlign: 'center',
                renderCell: (params) => (
                    <div style={{ textAlign: 'center', width: '100%' }}>{params.value}</div>
                ),
            },
        ];

        return (
            <Fragment>
                <Container className="full-screen-container">
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            width="100%"
                            textAlign="center"
                        >
                            <Typography
                                variant="h4"
                                component="h2"
                                gutterBottom
                            >
                                View Items
                            </Typography>
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleDownload}
                            size="small"
                            sx={{
                                padding: '4px 12px',
                                fontSize: '0.80rem',
                                borderRadius: '4px',
                                textTransform: 'none',
                                whiteSpace: 'nowrap', // Prevents text from wrapping
                                minWidth: '100px',    // Ensures sufficient button width
                            }}
                        >
                            Download Report
                        </Button>

                    </Box>
                    {/* Search input field */}
                    <TextField
                        label="Search Items"
                        variant="outlined"
                        fullWidth
                        value={searchQuery}
                        onChange={this.handleSearchChange}
                        sx={{
                            marginBottom: 2,
                            backgroundColor: '#f7f7f7',
                            borderRadius: '8px',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#ccc',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#888',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#034ff1',
                                },
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    {/* Filter input fields */}
                    <Grid container spacing={2} mb={2}>
                        <Grid item xs={6} sm={3}>
                            <TextField
                                label="Min Quantity"
                                variant="outlined"
                                fullWidth
                                type="number"
                                value={filters.minQuantity}
                                onChange={(e) => this.handleFilterChange('minQuantity', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <TextField
                                label="Max Quantity"
                                variant="outlined"
                                fullWidth
                                type="number"
                                value={filters.maxQuantity}
                                onChange={(e) => this.handleFilterChange('maxQuantity', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <TextField
                                label="Min Price ($)"
                                variant="outlined"
                                fullWidth
                                type="number"
                                value={filters.minPrice}
                                onChange={(e) => this.handleFilterChange('minPrice', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <TextField
                                label="Max Price ($)"
                                variant="outlined"
                                fullWidth
                                type="number"
                                value={filters.maxPrice}
                                onChange={(e) => this.handleFilterChange('maxPrice', e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    {/* Display error message if any */}
                    {error && <Typography color="error">{error}</Typography>}
                    {/* Display DataGrid or no items message */}
                    {filteredItems.length > 0 ? (
                        <div style={{ height: '65vh', width: '100%' }}>
                            <DataGrid
                                sx={{
                                    '.MuiDataGrid-columnHeaders': {
                                        backgroundColor: 'red',
                                    },
                                }}
                                rows={filteredItems}
                                columns={columns}
                                pageSize={10}
                                rowsPerPageOptions={[10, 20, 50]}
                                checkboxSelection
                            />
                        </div>
                    ) : (
                        !error && <Typography>No items found.</Typography>
                    )}
                </Container>
            </Fragment>
        );
    }
}

export default ViewItems;
