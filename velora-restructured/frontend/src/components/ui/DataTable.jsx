import React from 'react';

export function DataTable({
  columns,
  data = [],
  keyField = 'id',
  emptyMessage = 'No records found.'
}) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-white/10 bg-[#182331] shadow-xl">
      <table className="w-full text-left border-collapse min-w-[650px]">
        <thead>
          <tr className="bg-[#0e1827] border-b border-white/10 text-xs font-semibold text-[#b9c7dd] uppercase tracking-wider">
            {columns.map((col, idx) => (
              <th key={col.key || idx} className={`px-6 py-4 ${col.className || ''}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 text-sm text-slate-200">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-12 text-center text-slate-400 font-medium">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr 
                key={row[keyField] || rowIndex} 
                className="hover:bg-white/[0.03] transition-colors group"
              >
                {columns.map((col, colIndex) => (
                  <td key={col.key || colIndex} className={`px-6 py-4 ${col.className || ''}`}>
                    {col.render ? col.render(row, rowIndex) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
