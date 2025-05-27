import type { Customer } from "./interface";

const API_BASE_URL = "http://localhost:5000/api";

export const customerApi = {
  async getCustomers(): Promise<Customer[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/customers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, message: ${await response.text()}`);
      }

      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Error fetching customers:", error);
      throw error; // Throw the error so Dashboard can catch it
    }
  },
};