'use client'


import { useState, useEffect } from 'react';
import LineChart from '../../components/LineChart.jsx';
import BarChart from '../../components/BarChart.jsx';
import PieChart from '../../components/PieChart.jsx';
import TimeSelector from '../../components/TimeSelector.jsx';






const CRMPage = () => {
    const [lineData, setLineData] = useState({ labels: [], values: [] });
    const [barData, setBarData] = useState({ labels: [], values: [] });
    const [pieData, setPieData] = useState({ labels: [], values: [] });
    const [error, setError] = useState(null);
    const [timeFilter, setTimeFilter] = useState('1d');

    useEffect(() => {
        const fetchData = async (filter) => {
            try {

                // Fetch data from static JSON files based on the time filter
                const barResponse = await fetch(`https://mocki.io/v1/0e2b9d6d-d212-42a9-87ed-01580c041a0e`);
                const lineResponse = await fetch(`https://mocki.io/v1/0e2b9d6d-d212-42a9-87ed-01580c041a0e`);
                const pieResponse = await fetch(`https://mocki.io/v1/f967a7f3-09c0-4116-8bc0-4bdbf2c803c9`);

                if (!lineResponse.ok || !barResponse.ok || !pieResponse.ok) {
                    throw new Error('Network response was not ok.');
                }

                const lineDataAll = await lineResponse.json();
                const barDataAll = await barResponse.json();
                const pieDataAll = await pieResponse.json();

                // Filter data based on selected time filter
                setLineData(lineDataAll[filter] || { labels: [], values: [] });
                setBarData(barDataAll[filter] || { labels: [], values: [] });
                setPieData(pieDataAll[filter] || { labels: [], values: [] });
            } catch (err) {
                setError(err.message || 'An unknown error occurred');
            }
        };

        fetchData(timeFilter);
    }, [timeFilter]);

    const handleFilterChange = (newFilter) => {
        setTimeFilter(newFilter);
    };

    if (error) {
        return (
            <div className="container mx-auto p-6">
                <div className="bg-red-100 text-red-800 p-4 rounded border border-red-600">
                    <h2 className="text-xl font-bold">Error</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (!lineData || !barData || !pieData) {
        return (
            <div className="container mx-auto p-6">
                <p>Loading...</p>
            </div>
        );
    }

    // Line chart data and options
    const lineChartData = {
        labels: lineData.labels,
        datasets: [
            {
                label: 'Line Dataset',
                data: lineData.values,
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.1,  // Make the line smoother
            },
        ],
    };

    const lineChartOptions = {
        responsive: true,
        scales: {
            x: {
                type: 'category',
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                type: 'linear',
                title: {
                    display: true,
                    text: 'Value',
                },
                min: Math.min(...lineData.values) - 10,  // Dynamic min value for better visualization
                max: Math.max(...lineData.values) + 10,  // Dynamic max value for better visualization
            },
        },
    };

    // Bar chart data and options
    const barChartData = {
        labels: barData.labels,
        datasets: [
            {
                label: 'Bar Dataset',
                data: barData.values,
                backgroundColor: 'rgba(54,162,235,0.2)',
                borderColor: 'rgba(54,162,235,1)',
                borderWidth: 1,
            },
        ],
    };

    const barChartOptions = {
        responsive: true,
        scales: {
            x: {
                type: 'category',
                title: {
                    display: true,
                    text: 'Category',
                },
            },
            y: {
                type: 'linear',
                title: {
                    display: true,
                    text: 'Value',
                },
                min: Math.min(...barData.values) - 10,  // Dynamic min value for better visualization
                max: Math.max(...barData.values) + 10,  // Dynamic max value for better visualization
            },
        },
    };

    // Pie chart data and options
    const pieChartData = {
        labels: pieData.labels,
        datasets: [
            {
                data: pieData.values,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            },
        ],
    };

    const pieChartOptions = {
        responsive: true,
    };



    return (
        <div className="container mx-auto p-6 mt-2 bg-slate-200">
            <h1 className="text-2xl font-bold mb-6">CRM Dashboard</h1>

            <TimeSelector onFilterChange={handleFilterChange} />



            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="col-span-1">
                    <h2 className="text-xl font-semibold mb-4">Line Chart</h2>
                    <LineChart data={lineChartData} options={lineChartOptions} />
                </div>
                <div className="col-span-1">
                    <h2 className="text-xl font-semibold mb-4">Bar Chart</h2>
                    <BarChart data={barChartData} options={barChartOptions} />
                </div>
                <div className="col-span-1">
                    <h2 className="text-xl font-semibold mb-4">Pie Chart</h2>
                    <PieChart data={pieChartData} options={pieChartOptions} />
                </div>
            </div>
        </div>
    );
};

export default CRMPage;
