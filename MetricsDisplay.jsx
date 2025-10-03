import React from 'react';

/**
 * Displays the classified land cover percentages.
 */
const MetricsDisplay = ({ metrics }) => {
    if (!metrics) return null;

    return (
        <div className="space-y-3 p-4 bg-white rounded-lg shadow-inner border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center border-b pb-2 mb-2">
                <i className="lucide lucide-pie-chart w-5 h-5 mr-2 text-indigo-500"></i>
                Land Cover Classification
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {['urban', 'water', 'vegetation', 'barren_land'].map(type => {
                    const key = `${type}_percent`;
                    const percent = metrics[key];
                    let color = 'text-gray-600 border-gray-300';
                    if (type === 'urban') color = 'text-red-600 border-red-300';
                    if (type === 'water') color = 'text-blue-600 border-blue-300';
                    if (type === 'vegetation') color = 'text-green-600 border-green-300';
                    if (type === 'barren_land') color = 'text-yellow-600 border-yellow-300';

                    return (
                        <div key={type} className={`p-2 border rounded-lg text-center bg-white shadow-sm transition-shadow ${color}`}>
                            <div className="font-bold text-xl">{percent !== undefined ? `${percent.toFixed(1)}%` : 'N/A'}</div>
                            <div className="text-xs font-medium mt-1 uppercase opacity-80">{type.replace('_', ' ')}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MetricsDisplay;
