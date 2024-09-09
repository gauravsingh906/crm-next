import { useState } from 'react';

const TimeSelector = ({ onFilterChange }) => {
    const [selectedTime, setSelectedTime] = useState('1d');

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedTime(value);
        onFilterChange(value);
    };

    return (
        <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">Select Time Window:</label>
            <select
                value={selectedTime}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2"
            >
                <option value="1d">Last 1 Day</option>
                <option value="7d">Last 7 Days</option>
                <option value="15d">Last 15 Days</option>
                <option value="1m">Last 1 Month</option>
                <option value="3m">Last 3 Months</option>
                <option value="6m">Last 6 Months</option>
                <option value="1y">Last 1 Year</option>
            </select>
        </div>
    );
};

export default TimeSelector;
