import React, { Component, Fragment } from 'react';
import { getItems } from '../services/api';
import { Pie, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    ArcElement,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

class Dashboard extends Component {
    state = {
        items: [], // Ensure it's an empty array by default
    };

    componentDidMount() {
        getItems()
            .then((response) => {
                this.setState({ items: response });
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    // Pie Chart Data
    getPieData(items) {
        if (!items || items.length === 0) {
            return {
                labels: [],
                datasets: [
                    {
                        data: [],
                        backgroundColor: [],
                    },
                ],
            };
        }

        return {
            labels: items.map((item) => item.name),
            datasets: [
                {
                    data: items.map((item) => item.quantity),
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#AA6FE9', '#4CAF50', '#FFC107', '#03A9F4'],
                },
            ],
        };
    }

    // Bar Chart Data
    getBarData(items) {
        if (!items || items.length === 0) {
            return {
                labels: [],
                datasets: [
                    {
                        label: 'Quantity',
                        backgroundColor: '#4CAF50',
                        borderColor: '#388E3C',
                        data: [],
                    },
                ],
            };
        }

        return {
            labels: items.map((item) => item.name),
            datasets: [
                {
                    label: 'Quantity',
                    backgroundColor: '#4CAF50',
                    borderColor: '#388E3C',
                    data: items.map((item) => item.quantity),
                },
            ],
        };
    }

    render() {
        const { items } = this.state;

        return (
            <Fragment>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Dashboard</h2>
                <div className="chart-container" style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    flexWrap: 'wrap',
                    gap: '20px',
                    padding: '20px'
                }}>
                    <div className="chart pie-chart" style={{ flex: '1 1 45%', minWidth: '300px', height: '300px' }}>
                        <Pie data={this.getPieData(items)} options={{ responsive: true, maintainAspectRatio: false }} />
                    </div>
                    <div className="chart bar-chart" style={{ flex: '1 1 45%', minWidth: '300px', height: '300px' }}>
                        <Bar data={this.getBarData(items)} options={{ responsive: true, maintainAspectRatio: false }} />
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Dashboard;
