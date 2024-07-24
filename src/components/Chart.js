import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Consumidor', uv: 5, pv: 10, qv: 15, amt: 20 },
  { name: 'Acionista', uv: 10, pv: 10, qv: 24, amt: 20 },
  { name: 'Conselho', uv: 20, pv: 10, qv: 15, amt: 25 },
  { name: 'Colaboradores', uv: 15, pv: 15, qv: 10, amt: 20 },
  { name: 'Fornecedores', uv: 10, pv: 15, qv: 20, amt: 25 },
];

const Chart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="uv" fill="#D9D9D9" />
        <Bar dataKey="pv" fill="#FF970E" />
        <Bar dataKey="qv" fill="#054869" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default Chart;
