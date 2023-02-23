import { API_BASE_URL, API_ENDPOINTS } from "@config/api";
import axios from "axios";

export const getProductsByCategory = async (id: number, limit?: number) => {
  const filter = limit ? `&offset=0&limit=${limit}` : "";
  const response = await axios.get(
    `${API_BASE_URL}${API_ENDPOINTS.PRODUCTS_BY_CATEGORY}${id}${filter}`
  );

  if (response.status !== 200) {
    throw new Error();
  }

  return response.data;
};
