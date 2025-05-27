"use client"

import { useState, useMemo } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, ArrowUpDown } from "lucide-react"
import type { Customer } from "@/lib/interface"

interface CustomerTableProps {
  customers: Customer[]
}

type SortField = keyof Customer
type SortDirection = "asc" | "desc"

export default function CustomerTable({ customers }: CustomerTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<SortField>("name")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredAndSortedCustomers = useMemo(() => {
    const filtered = customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.nameOfLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.brandDevice.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    filtered.sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }

      return 0
    })

    return filtered
  }, [customers, searchTerm, sortField, sortDirection])

  const totalPages = Math.ceil(filteredAndSortedCustomers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedCustomers = filteredAndSortedCustomers.slice(startIndex, startIndex + itemsPerPage)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getGenderBadgeColor = (gender: string) => {
    return gender?.toLowerCase() === "male" ? "bg-blue-100 text-blue-800" : "bg-pink-100 text-pink-800"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Data Table</CardTitle>
        <CardDescription>Detailed view of all customer records with search and sorting capabilities</CardDescription>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers by name, email, location, or device..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="pl-8"
          />
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">
                  <Button variant="ghost" onClick={() => handleSort("number")} className="h-8 p-0">
                    No. <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("name")} className="h-8 p-0">
                    Name <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("age")} className="h-8 p-0">
                    Age <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("nameOfLocation")} className="h-8 p-0">
                    Location <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Interest</TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("date")} className="h-8 p-0">
                    Date <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCustomers.map((customer) => (
                <TableRow key={customer._id || customer.number}>
                  <TableCell className="font-medium">{customer.number}</TableCell>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.age}</TableCell>
                  <TableCell>
                    <Badge className={getGenderBadgeColor(customer.gender)}>{customer.gender}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{customer.email}</TableCell>
                  <TableCell>{customer.noTelp}</TableCell>
                  <TableCell>{customer.nameOfLocation}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{customer.brandDevice}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{customer.digitalInterest}</TableCell>
                  <TableCell className="text-sm">{customer.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredAndSortedCustomers.length)} of{" "}
            {filteredAndSortedCustomers.length} results
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
