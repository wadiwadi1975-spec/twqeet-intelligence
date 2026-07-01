import React from 'react';

interface DataTableProps {
  headers: string[];
  data: any[];
}

export default function DataTable({ headers, data }: DataTableProps) {
  return (
    <table className="table-auto border-collapse border border-gold w-full text-sm">
      <thead>
        <tr>
          {headers.map((header, idx) => (
            <th key={idx} className="border border-gold px-2 py-1 text-gold">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {headers.map((header, i) => (
              <td key={i} className="border border-gold px-2 py-1 text-gold">{row[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
