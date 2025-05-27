"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Customer } from "@/lib/interface"

interface LocationTypeChartProps {
  customers: Customer[]
}

export default function LocationTypeChart({ customers }: LocationTypeChartProps) {
  const locationData = customers.reduce(
    (acc, customer) => {
      const locationType = customer.locationType
      acc[locationType] = (acc[locationType] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const chartData = Object.entries(locationData).map(([type, count]) => ({
    name: type,
    value: count,
    percentage: ((count / customers.length) * 100).toFixed(1),
  }))

  const COLORS = ["#8B5CF6", "#F59E0B", "#EF4444", "#06B6D4", "#84CC16"]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Location Types</CardTitle>
        <CardDescription>Distribution of customer location types</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
