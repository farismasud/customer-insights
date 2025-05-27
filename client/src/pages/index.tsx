"use client"
import { useRouter } from "next/router"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, Users, TrendingUp } from "lucide-react"

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto p-6">
        <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white">Customer Analytics</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
              Comprehensive customer data analysis and visualization platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
            <Card className="text-center">
              <CardHeader>
                <BarChart3 className="h-12 w-12 mx-auto text-blue-600" />
                <CardTitle>Data Visualization</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Interactive charts and graphs to visualize customer data patterns</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 mx-auto text-green-600" />
                <CardTitle>Customer Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Detailed customer profiles and demographic analysis</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <TrendingUp className="h-12 w-12 mx-auto text-purple-600" />
                <CardTitle>Real-time Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Live data updates and real-time customer behavior tracking</CardDescription>
              </CardContent>
            </Card>
          </div>

          <Button onClick={() => router.push("/dashboard")} size="lg" className="text-lg px-8 py-3">
            View Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}
