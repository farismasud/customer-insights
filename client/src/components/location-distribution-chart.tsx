"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Customer } from "@/lib/interface"

interface LocationDistributionChartProps {
  customers: Customer[]
}

export default function LocationDistributionChart({
  customers,
}: LocationDistributionChartProps) {
  const locationMap = new Map<string, number>()

  customers.forEach((customer) => {
    const loc = customer.nameOfLocation || "Unknown"
    locationMap.set(loc, (locationMap.get(loc) || 0) + 1)
  })

  const locationData = Array.from(locationMap.entries()).map(([location, count]) => ({
    location,
    count,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Location Distribution</CardTitle>
        <CardDescription>Number of customers per unique location</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={locationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="location" />
              <YAxis allowDecimals={false} />
              <Tooltip
                formatter={(value: number) => [value, "Customers"]}
                labelFormatter={(label) => `Location: ${label}`}
              />
              <Bar dataKey="count" fill="#6366F1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
