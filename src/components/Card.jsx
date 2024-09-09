// Card.js
import React from 'react';

const Card = ({ title, value, change, icon, description, subtext, changeType }) => {
    return (
        <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl mt-20 bg-slate-200 transition-shadow duration-300 transform hover:scale-105 max-w-md md:max-w-lg lg:max-w-xl mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                    <div className="text-4xl">{icon}</div> {/* Increased icon size */}
                    <div>
                        <h3 className="text-2xl font-semibold">{title}</h3> {/* Larger title */}
                        <p className="text-gray-600 text-lg">{description}</p> {/* Larger description */}
                    </div>
                </div>
                <div className="text-right">
                    <h4 className="text-3xl font-bold">{value}</h4> {/* Larger value */}
                    <p className={`text-lg ${changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
                        {changeType === 'increase' ? '+' : '-'}
                        {change}
                    </p>
                    <p className="text-gray-500 text-sm">{subtext}</p>
                </div>
            </div>
        </div>
    );
};

export default Card;
