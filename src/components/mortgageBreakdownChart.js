import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const MortgageBreakdownChart = ({ mortgageBreakdown }) => {
  const data = [
    { name: "Principal & Interest", value: mortgageBreakdown.principalInterest },
    { name: "Property Tax", value: mortgageBreakdown.propertyTax },
    { name: "Home Insurance", value: mortgageBreakdown.homeInsurance },
    { name: "PMI", value: mortgageBreakdown.pmi },
    { name: "HOA Dues", value: mortgageBreakdown.hoa },
  ].filter((entry) => entry.value > 0); // Remove any slices that are 0%

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF"];

  return (
    <PieChart width={650} height={500}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={150}
        fill="#8884d8"
        dataKey="value"
        label={({ name, percent }) =>
          percent > 0 ? `${name} ${(percent * 100).toFixed(0)}%` : ""
        }
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default MortgageBreakdownChart;
