import React from 'react';

const Table = ({ columns, data, keyField = 'id' }) => {
    return (
        <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900/40 backdrop-blur-md">
            <table className="w-full text-left text-sm text-gray-300">
                <thead className="bg-gray-800/80 text-xs uppercase text-gray-400 border-b border-gray-700">
                    <tr>
                        {columns.map((col, idx) => (
                            <th key={idx} scope="col" className="px-6 py-4 font-medium tracking-wider">
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                    {data.map((row, idx) => (
                        <tr key={row[keyField] || idx} className="hover:bg-gray-800/40 transition-colors duration-200">
                            {columns.map((col, colIdx) => (
                                <td key={colIdx} className="px-6 py-4 whitespace-nowrap">
                                    {col.cell ? col.cell(row) : row[col.accessorKey]}
                                </td>
                            ))}
                        </tr>
                    ))}
                    {data.length === 0 && (
                        <tr>
                            <td colSpan={columns.length} className="px-6 py-8 text-center text-gray-500">
                                No records found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
