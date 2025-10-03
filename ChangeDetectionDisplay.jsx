import React from 'react';

/**
 * Displays the change detection results, including vegetation loss and urban growth.
 */
const ChangeDetectionDisplay = ({ change_detection }) => {
    if (!change_detection) return null;

    return (
        <div className="p-4 bg-yellow-50 rounded-xl shadow-md border border-yellow-200">
            <h3 className="text-lg font-semibold text-yellow-800 flex items-center border-b border-yellow-300 pb-2 mb-3">
                <i className="lucide lucide-trending-up w-5 h-5 mr-2"></i>
                Environmental Risk & Change Detection
            </h3>
            <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                    <span className="font-medium text-gray-700">Vegetation Loss (T1 to T2):</span>
                    <span className={`font-bold ${change_detection.vegetation_loss_percent > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {change_detection.vegetation_loss_percent.toFixed(1)}%
                    </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="font-medium text-gray-700">Urban Growth Rate:</span>
                    <span className="font-bold text-red-600">
                        {change_detection.urban_growth_rate.toFixed(2)} km²/year
                    </span>
                </div>
                <div className="pt-3 border-t border-yellow-300 mt-3 text-xs text-yellow-900">
                    <span className="font-semibold">Risk Note:</span> {change_detection.risk_areas_note}
                </div>
            </div>
        </div>
    );
};

export default ChangeDetectionDisplay;
