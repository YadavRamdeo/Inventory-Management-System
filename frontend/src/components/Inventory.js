import React, { Component, Fragment } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Typography, TextField, InputAdornment, Button, Box, Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { fetchInventory } from '../services/api'; // Ensure this includes your AI insights API

class Inventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inventory: [],
            filteredInventory: [],
            searchQuery: '',
            filters: {
                itemName: '',
                typeOfItem: '',
                countryOfOrigin: '',
            },
            aiInsights: null, // To store AI-based insights
            loading: true,
            loadingAI: false, // Separate loader for AI insights
            error: null,
        };
    }

    componentDidMount() {
        this.loadInventory();
    }

    loadInventory = async () => {
        try {
            const data = await fetchInventory(); // Fetch inventory data
            if (!Array.isArray(data)) {
                throw new Error('Invalid data format received');
            }
            this.setState({
                inventory: data,
                filteredInventory: data,
                loading: false,
            });
            this.loadAIInsights(data); // Fetch AI insights after loading inventory
        } catch (error) {
            console.error('Error loading inventory:', error);
            this.setState({
                loading: false,
                error: error.message || 'Failed to load inventory data.',
            });
        }
    };

    loadAIInsights = async (inventory) => {
        this.setState({ loadingAI: true });
        try {
            const aiData = await fetchInventory(inventory); // Call your AI API with inventory data
            this.setState({
                aiInsights: aiData,
                loadingAI: false,
            });
        } catch (error) {
            console.error('Error loading AI insights:', error);
            this.setState({
                aiInsights: null,
                loadingAI: false,
            });
        }
    };

    handleSearchChange = (event) => {
        const query = event.target.value.toLowerCase();
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
        const { inventory, searchQuery, filters } = this.state;
        const { itemName, typeOfItem, countryOfOrigin } = filters;

        const filtered = inventory.filter((item) => {
            const matchesSearchQuery =
                searchQuery === '' ||
                item.item?.name?.toLowerCase().includes(searchQuery) ||
                item.item?.type_of_item?.toLowerCase().includes(searchQuery) ||
                item.item?.country_of_origin?.toLowerCase().includes(searchQuery);

            const matchesItemName =
                itemName === '' || item.item?.name?.toLowerCase().includes(itemName.toLowerCase());

            const matchesTypeOfItem =
                typeOfItem === '' || item.item?.type_of_item?.toLowerCase().includes(typeOfItem.toLowerCase());

            const matchesCountryOfOrigin =
                countryOfOrigin === '' ||
                item.item?.country_of_origin?.toLowerCase().includes(countryOfOrigin.toLowerCase());

            return matchesSearchQuery && matchesItemName && matchesTypeOfItem && matchesCountryOfOrigin;
        });

        this.setState({ filteredInventory: filtered });
    };

    handleDownload = () => {
        const { filteredInventory } = this.state;
        const rows = filteredInventory.map((inv, index) => ({
            ID: index + 1,
            Name: inv.item?.name || 'N/A',
            'Type of Item': inv.item?.type_of_item || 'N/A',
            'Country of Origin': inv.item?.country_of_origin || 'N/A',
            'Current Stock': inv.current_stock ?? 0,
            'Total Stock': inv.total_cumulative_stock ?? 0,
            Price: inv.price ?? 0,
        }));

        const worksheet = XLSX.utils.json_to_sheet(rows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Inventory');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'inventory_report.xlsx');
    };

    render() {
        const { filteredInventory, loading, loadingAI, aiInsights, error, searchQuery, filters } = this.state;

        const columns = [
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'itemName', headerName: 'Item Name', width: 200 },
            { field: 'typeOfItem', headerName: 'Type of Item', width: 150 },
            { field: 'countryOfOrigin', headerName: 'Country of Origin', width: 180 },
            { field: 'currentStock', headerName: 'Current Stock', width: 150 },
            { field: 'totalStock', headerName: 'Total Stock', width: 200 },
            { field: 'price', headerName: 'Price ($)', width: 120 },
        ];

        const rows = filteredInventory.map((inv, index) => ({
            id: index + 1,
            itemName: inv.item?.name || 'N/A',
            typeOfItem: inv.item?.type_of_item || 'N/A',
            countryOfOrigin: inv.item?.country_of_origin || 'N/A',
            currentStock: inv.current_stock ?? 0,
            totalStock: inv.total_cumulative_stock ?? 0,
            price: inv.price ?? 0,
        }));

        return (
            <Fragment>
                <Container className="full-screen-container">
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Box flexGrow={1} textAlign="center">
                            <Typography variant="h4" component="h2">
                                Inventory Table
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
                                minWidth: '100px',
                            }}
                        >
                            Download Report
                        </Button>
                    </Box>

                    <TextField
                        label="Search Inventory"
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

                    <Grid container spacing={2} mb={2}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Item Name"
                                variant="outlined"
                                fullWidth
                                value={filters.itemName}
                                onChange={(e) => this.handleFilterChange('itemName', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Type of Item"
                                variant="outlined"
                                fullWidth
                                value={filters.typeOfItem}
                                onChange={(e) => this.handleFilterChange('typeOfItem', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Country of Origin"
                                variant="outlined"
                                fullWidth
                                value={filters.countryOfOrigin}
                                onChange={(e) => this.handleFilterChange('countryOfOrigin', e.target.value)}
                            />
                        </Grid>
                    </Grid>

                    {loading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '400px' }}>
                            <CircularProgress />
                        </Box>
                    ) : error ? (
                        <Typography color="error">{error}</Typography>
                    ) : filteredInventory.length > 0 ? (
                        <div style={{ height: 500, width: '100%' }}>
                            <DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection />
                        </div>
                    ) : (
                        <Typography>No items found.</Typography>
                    )}

                    {loadingAI ? (
                        <Typography>Loading AI Insights...</Typography>
                    ) : aiInsights ? (
                        <Box mt={3} p={2} bgcolor="#f0f4f8" borderRadius="8px">
                            <Typography variant="h6" mb={2}>
                                AI Insights
                            </Typography>
                            <ul>
                                {aiInsights.map((insight, index) => (
                                    <li key={index}>
                                        <Typography>{insight}</Typography>
                                    </li>
                                ))}
                            </ul>
                        </Box>
                    ) : (
                        <Typography>No AI insights available.</Typography>
                    )}
                </Container>
            </Fragment>
        );
    }
}

export default Inventory;
