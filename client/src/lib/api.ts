import type { Customer } from "./interface";

export const customerApi = {
  async getCustomersBatch(
    page = 1,
    limit = 50000
  ): Promise<{
    data: Customer[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  }> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/customers?page=${page}&limit=${limit}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, message: ${await response.text()}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching customer batch:", error);
      throw error;
    }
  },
};
