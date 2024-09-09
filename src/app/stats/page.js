// CRMPage.js
import React from 'react';
import { HiOutlineChartSquareBar, HiOutlineUsers, HiArrowUp, HiArrowDown } from 'react-icons/hi';
import { FaDollarSign } from 'react-icons/fa';
import Card from '../../components/Card'; // Make sure the path to Card.js is correct

const cardStats = [
    {
        title: 'New Leads',
        value: '1,150',
        change: '+20',
        icon: <HiOutlineChartSquareBar size={24} className="text-purple-500" />,
        description: 'Number of new leads this week',
        subtext: 'Compared to last week',
        tooltip: 'Shows the total new leads generated in the current week.',
        changeType: 'increase',
    },
    {
        title: 'Total Sales',
        value: '$15,000',
        change: '+5.3',
        icon: <FaDollarSign size={24} className="text-green-500" />,
        description: 'Revenue generated in this month',
        subtext: 'Highest sales in the past 6 months',
        tooltip: 'This value represents total sales for the month.',
        changeType: 'increase',
    },
    {
        title: 'Conversion Rate',
        value: '4.2%',
        change: '-0.5',
        icon: <HiOutlineUsers size={24} className="text-blue-500" />,
        description: 'Rate of conversion from leads to customers',
        subtext: 'Slight drop compared to last month',
        tooltip: 'Indicates the conversion rate from leads to sales.',
        changeType: 'decrease',
    },
    {
        title: 'Monthly Visitors',
        value: '20,500',
        change: '+10',
        icon: <HiArrowUp size={24} className="text-orange-500" />,
        description: 'Number of visitors on the website this month',
        subtext: '10% growth compared to last month',
        tooltip: 'Represents monthly visitors to the website.',
        changeType: 'increase',
    },
    {
        title: 'Customer Retention',
        value: '92%',
        change: '-1.2',
        icon: <HiArrowDown size={24} className="text-red-500" />,
        description: 'Percentage of customers retained',
        subtext: 'Slight decrease compared to last quarter',
        tooltip: 'Percentage of customers who have continued service.',
        changeType: 'decrease',
    },
];

const CRMPage = () => {
    return (
        <div className="container mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {cardStats.map((stat, index) => (
                    <Card
                        key={index}
                        title={stat.title}
                        value={stat.value}
                        change={stat.change}
                        icon={stat.icon}
                        description={stat.description}
                        subtext={stat.subtext}
                        tooltip={stat.tooltip}
                        changeType={stat.changeType}
                    />
                ))}
            </div>
        </div>
    );
};

export default CRMPage;
