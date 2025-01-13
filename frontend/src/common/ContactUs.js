import React, { Component, Fragment } from 'react';
import { fetchContactUsMessages } from '../services/api';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { saveAs } from 'file-saver';

class ContactUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        };
    }

    componentDidMount() {
        // Fetch contact messages and update the state
        fetchContactUsMessages().then((data) => this.setState({ messages: data }));
    }

    downloadReport = () => {
        const csvContent = [
            ['ID', 'Name', 'Email', 'Subject', 'Message', 'Received At'],
            ...this.state.messages.map(message => [
                message.id,
                message.name,
                message.email,
                message.subject,
                message.message,
                new Date(message.created_at).toLocaleString()
            ]),
        ].map(e => e.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'contact_us_messages.csv');
    };

    render() {
        const columns = [
            { field: 'id', headerName: 'ID', width: 90 },
            { field: 'name', headerName: 'Name', width: 150 },
            { field: 'email', headerName: 'Email', width: 200 },
            { field: 'subject', headerName: 'Subject', width: 200 },
            { field: 'message', headerName: 'Message', width: 300 },
            { field: 'created_at', headerName: 'Received At', width: 180, valueFormatter: ({ value }) => new Date(value).toLocaleString() },
        ];

        const rows = this.state.messages.map((message, index) => ({ id: message.id, ...message }));

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

export default ContactUs;
