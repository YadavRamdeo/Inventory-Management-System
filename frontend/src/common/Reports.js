import React, { Component } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { fetchReports } from '../services/api';
import { saveAs } from 'file-saver';

class Reports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reports: [],
        };
    }

    componentDidMount() {
        // Fetch reports and update the state
        fetchReports().then((data) => this.setState({ reports: data }));
    }

    downloadReport = () => {
        const csvContent = [
            ['ID', 'Report Type', 'Start Date', 'End Date', 'Generated At'],
            ...this.state.reports.map(report => [
                report.id,
                report.report_type,
                report.start_date,
                report.end_date,
                new Date(report.generated_at).toLocaleString()
            ]),
        ].map(e => e.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'reports.csv');
    };

    render() {
        const columns = [
            { field: 'id', headerName: 'ID', width: 90 },
            { field: 'report_type', headerName: 'Report Type', width: 200 },
            { field: 'start_date', headerName: 'Start Date', width: 150 },
            { field: 'end_date', headerName: 'End Date', width: 150 },
            { field: 'generated_at', headerName: 'Generated At', width: 180, valueFormatter: ({ value }) => new Date(value).toLocaleString() },
        ];

        const rows = this.state.reports.map((report, index) => ({ id: report.id, ...report }));

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

export default Reports;
