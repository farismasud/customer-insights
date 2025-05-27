"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Customer } from "@/lib/interface";

interface AgeDistributionChartProps {
  customers: Customer[];
}

export default function AgeDistributionChart({ customers }: AgeDistributionChartProps) {
  // Group ages into ranges
  const ageRanges = [
    { range: "18-25", min: 18, max: 25 },
    { range: "26-35", min: 26, max: 35 },
    { range: "36-45", min: 36, max: 45 },
    { range: "46-55", min: 46, max: 55 },
    { range: "56+", min: 56, max: 100 },
  ];

  const ageData = ageRanges.map(({ range, min, max }) => {
    const count = customers.filter((customer) => customer.age >= min && customer.age <= max).length;
    return {
      range,
      count,
      percentage: customers.length > 0 ? ((count / customers.length) * 100).toFixed(1) : "0.0",
    };
  });

  console.log("Age Distribution Data:", ageData); // Debug log

  return (
    <Card>
      <CardHeader>
        <CardTitle>Age Distribution</CardTitle>
        <CardDescription>Customer distribution by age groups</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip
                formatter={(value, name) => [value, "Customers"]}
                labelFormatter={(label) => `Age Range: ${label}`}
              />
              <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}