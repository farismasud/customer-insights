import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Customer } from "@/lib/interface"

interface DigitalInterestChartProps {
  customers: Customer[]
}

export default function DigitalInterestChart({ customers }: DigitalInterestChartProps) {
  const interestData = customers.reduce(
    (acc, customer) => {
      const interest = customer.digitalInterest
      acc[interest] = (acc[interest] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const chartData = Object.entries(interestData)
    .map(([interest, count]) => ({
      interest: interest.length > 15 ? interest.substring(0, 15) + "..." : interest,
      fullInterest: interest,
      count,
      percentage: ((count / customers.length) * 100).toFixed(1),
    }))
    .sort((a, b) => b.count - a.count)

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Digital Interests</CardTitle>
        <CardDescription>Customer digital interests distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="interest" angle={-45} textAnchor="end" height={80} fontSize={12} />
              <YAxis />
              <Tooltip
                formatter={(value, name) => [value, "Customers"]}
                labelFormatter={(label) => {
                  const item = chartData.find((d) => d.interest === label)
                  return `Interest: ${item?.fullInterest || label}`
                }}
              />
              <Bar dataKey="count" fill="#F59E0B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
