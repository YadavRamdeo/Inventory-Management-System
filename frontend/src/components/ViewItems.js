import React, { Component, Fragment } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { getItems } from '../services/api';
import { Container, Typography, TextField, InputAdornment, Button, Box, Grid } from '@mui/material';
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

    // Fetch items from API when component mounts
    componentDidMount() {
        getItems()
            .then((response) => {
                const items = response || [];
                console.log(response, "items")
                this.setState({ items, filteredItems: items });
            })
            .catch((error) => {
                this.setState({ error: 'Failed to load items. Please try again later.' });
                console.error('Error fetching items:', error);
            });
    }

    // Handle search input change
    handleSearchChange = (event) => {
        const query = event.target.value?.toLowerCase() || '';
        this.setState({ searchQuery: query }, this.applyFilters);
    };

    // Handle filter input change
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

    // Apply search and filters to items
    applyFilters = () => {
        const { items, searchQuery, filters } = this.state;
        const { minQuantity, maxQuantity, minPrice, maxPrice } = filters;

        const filtered = items.filter((item) => {
            const matchesSearchQuery =
                item.name?.toLowerCase().includes(searchQuery) || item.description?.toLowerCase().includes(searchQuery);

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

    // Handle Excel report download
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

        // Define columns for the DataGrid
        const columns = [
            { field: 'id', headerName: 'ID', width: 100 },
            { field: 'name', headerName: 'Name', width: 150 },
            { field: 'quantity', headerName: 'Quantity', type: 'number', width: 120 },
            { field: 'price', headerName: 'Price ($)', type: 'number', width: 120 },
            { field: 'description', headerName: 'Description', width: 300 },
        ];

        return (
            <Fragment>
                <Container>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h4">View Items</Typography>
                        <Button variant="contained" color="primary" onClick={this.handleDownload}>
                            Download Report
                        </Button>
                    </Box>

                    {/* Search Field */}
                    <TextField
                        label="Search Items"
                        variant="outlined"
                        fullWidth
                        value={searchQuery}
                        onChange={this.handleSearchChange}
                        sx={{ marginBottom: 2 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* Filter Fields */}
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

                    {/* Display error or DataGrid */}
                    {console.log(filteredItems, "Filteritems")}
                    {error ? (
                        <Typography color="error">{error}</Typography>
                    ) : (
                        <div style={{ height: '65vh', width: '100%' }}>
                            <DataGrid
                                rows={filteredItems || []}
                                columns={columns}
                                pageSize={10}
                                rowsPerPageOptions={[10, 20, 50]}
                                checkboxSelection
                                sx={{
                                    '.MuiDataGrid-columnHeaders': {
                                        backgroundColor: '#f5f5f5',
                                    },
                                }}
                            />
                        </div>
                    )}
                </Container>
            </Fragment>
        );
    }
}

export default ViewItems;
