import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

const Heatmap = ({ data = [] }) => {

    const today = new Date();

    const startDate = new Date(
        today.getFullYear(),
        today.getMonth() - 5,
        1
    );

    return (
        <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 backdrop-blur-xl overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">
                    Activity Heatmap
                </h3>

                <span className="text-xs text-gray-400 bg-gray-800 px-3 py-1 rounded-full">
                    6 Months
                </span>
            </div>

            {/* Heatmap */}
            <div className="overflow-x-auto">
                <div className="min-w-[700px]">

                    <CalendarHeatmap
                        startDate={startDate}
                        endDate={today}
                        values={Array.isArray(data) ? data : []}

                        classForValue={(value) => {
                            if (!value || value.count === 0) {
                                return 'fill-gray-800';
                            }

                            if (value.count === 1) {
                                return 'fill-emerald-900';
                            }

                            if (value.count === 2) {
                                return 'fill-emerald-700';
                            }

                            if (value.count === 3) {
                                return 'fill-emerald-500';
                            }

                            return 'fill-emerald-400';
                        }}

                        tooltipDataAttrs={(value) => {
                            if (!value || !value.date) {
                                return {
                                    'data-tip': 'No activity',
                                };
                            }

                            return {
                                'data-tip': `${value.count} activities on ${value.date}`,
                            };
                        }}

                        showWeekdayLabels={true}
                    />
                </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex items-center justify-end gap-2 text-xs text-gray-400">

                <span>Less</span>

                <div className="w-3 h-3 rounded-sm bg-gray-800"></div>
                <div className="w-3 h-3 rounded-sm bg-emerald-900"></div>
                <div className="w-3 h-3 rounded-sm bg-emerald-700"></div>
                <div className="w-3 h-3 rounded-sm bg-emerald-500"></div>
                <div className="w-3 h-3 rounded-sm bg-emerald-300"></div>

                <span>More</span>
            </div>
        </div>
    );
};

export default Heatmap;