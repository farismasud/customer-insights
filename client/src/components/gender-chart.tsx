import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Customer } from "@/lib/interface"

interface GenderChartProps {
  customers: Customer[]
}

export default function GenderChart({ customers }: GenderChartProps) {
  const genderData = customers.reduce(
    (acc, customer) => {
      const gender = customer.gender?.toLowerCase()
      acc[gender] = (acc[gender] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const chartData = Object.entries(genderData).map(([gender, count]) => ({
    name: gender.charAt(0).toUpperCase() + gender.slice(1),
    value: count,
    percentage: ((count / customers.length) * 100).toFixed(1),
  }))

  const COLORS = ["#EC4899", "#3B82F6", "#10B981", "#F59E0B"]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gender Distribution</CardTitle>
        <CardDescription>Customer distribution by gender</CardDescription>
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
