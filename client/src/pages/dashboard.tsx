  import { useState, useEffect } from "react"
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
  import { Loader2, Users, Calendar, Clock, Smartphone } from "lucide-react"
  import { customerApi } from "@/lib/api"
  import type { Customer } from "@/lib/interface"
  import CustomerTable from "@/components/customer-table"
  import GenderChart from "@/components/gender-chart"
  import LocationDistributionChart from "@/components/location-distribution-chart"
  import DeviceBrandChart from "@/components/device-brand-chart"
  import LocationTypeChart from "@/components/location-type-chart"
  import DigitalInterestChart from "@/components/digital-interest-chart"

  export default function Dashboard() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      let isMounted = true;
      const limit = 150000;

      const fetchAllBatches = async () => {
        try {
          setLoading(true);
          let page = 1;
          let allCustomers: Customer[] = [];
          let totalPages = 1;

          do {
            const { data, totalPages: tp } = await customerApi.getCustomersBatch(page, limit);
            totalPages = tp;
            allCustomers = [...allCustomers, ...data];
            if (!isMounted) return; // safety check if component unmounted
            setCustomers([...allCustomers]); // update state incrementally
            page++;
          } while (page <= totalPages);

        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to fetch customers");
        } finally {
          if (isMounted) setLoading(false);
        }
      };

      fetchAllBatches();

      return () => {
        isMounted = false;
      };
    }, []);


    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading customer data...</span>
          </div>
        </div>
      )
    }

    if (error) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <Card className="w-96">
            <CardHeader>
              <CardTitle className="text-red-600">Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{error}</p>
            </CardContent>
          </Card>
        </div>
      )
    }

    // Calculate summary statistics
    const totalCustomers = customers.length
    const maleCount = customers.filter((c) => c.gender?.toLowerCase() === "male").length
    const femaleCount = customers.filter((c) => c.gender?.toLowerCase() === "female").length
    const avgAge = customers.length > 0 ? Math.round(customers.reduce((sum, c) => sum + c.age, 0) / customers.length) : 0
    const uniqueLocations = new Set(customers.map((c) => c.nameOfLocation)).size
    const uniqueDevices = new Set(customers.map((c) => c.brandDevice)).size

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto p-6 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Customer Analytics Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300">Comprehensive overview of customer data and insights</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                <Users className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalCustomers}</div>
                <p className="text-xs text-blue-100">
                  {maleCount} Male, {femaleCount} Female
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Age</CardTitle>
                <Calendar className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avgAge} years</div>
                <p className="text-xs text-green-100">
                  Age range: {customers.reduce((min, c) => Math.min(min, c.age), Infinity)} - {customers.reduce((max, c) => Math.max(max, c.age), -Infinity)}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Locations</CardTitle>
                <Clock className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{uniqueLocations}</div>
                <p className="text-xs text-purple-100">Unique locations</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Device Brands</CardTitle>
                <Smartphone className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{uniqueDevices}</div>
                <p className="text-xs text-orange-100">Different brands</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 gap-2 bg-gray-100 rounded-md p-1">
            <TabsTrigger
              value="overview"
              className="text-black px-4 py-2 font-medium hover:bg-gray-200 data-[state=active]:bg-white data-[state=active]:text-zinc-900">
              Data Overview
            </TabsTrigger>
            <TabsTrigger
              value="table"
              className="text-black px-4 py-2 font-medium hover:bg-gray-200 data-[state=active]:bg-white data-[state=active]:text-zinc-900">
              Customer Table
            </TabsTrigger>
          </TabsList>


            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GenderChart customers={customers} />
                <LocationDistributionChart customers={customers} />
                <DeviceBrandChart customers={customers} />
                <LocationTypeChart customers={customers} />
                <DigitalInterestChart customers={customers} />
              </div>
            </TabsContent>

            <TabsContent value="table">
              <CustomerTable customers={customers} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )
  }
