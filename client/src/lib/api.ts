import type { Customer } from "./interface";

export const customerApi = {
  async getCustomersBatch(page = 1, limit = 150000): Promise<{
    data: Customer[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  }> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/customers?page=${page}&limit=${limit}`);
    if (!response.ok) throw new Error("Failed to fetch batch");
    return response.json();
  }
};
