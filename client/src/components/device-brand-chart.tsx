"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Customer } from "@/lib/interface"

interface DeviceBrandChartProps {
  customers: Customer[]
}

export default function DeviceBrandChart({ customers }: DeviceBrandChartProps) {
  const deviceData = customers.reduce(
    (acc, customer) => {
      const brand = customer.brandDevice?.trim() || "Unknown"
      acc[brand] = (acc[brand] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const chartData = Object.entries(deviceData)
    .map(([brand, count]) => ({
      brand,
      count,
      percentage: customers.length > 0 ? ((count / customers.length) * 100).toFixed(1) : "0",
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8) // Top 8 brands for better visibility

  // Debug log to check data
  console.log("Device Brand Data:", chartData)
  console.log("Raw device data:", deviceData)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Device Brands</CardTitle>
        <CardDescription>Most popular device brands among customers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="brand" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
              <Tooltip
                formatter={(value: any) => [value, "Customers"]}
                labelFormatter={(label) => `Brand: ${label}`}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
              <Bar dataKey="count" fill="#10B981" radius={[4, 4, 0, 0]} minPointSize={2} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Show summary below chart */}
        <div className="mt-4 space-y-1">
          <div className="text-sm font-medium">Top Brands:</div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {chartData.slice(0, 6).map((item) => (
              <div key={item.brand} className="flex justify-between">
                <span className="truncate">{item.brand}</span>
                <span className="text-muted-foreground">
                  {item.count} ({item.percentage}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
