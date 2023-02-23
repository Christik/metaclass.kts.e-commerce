import { API_BASE_URL, API_ENDPOINTS } from "@config/api";
import axios from "axios";

export const getAllProducts = async (offset: number = 0, limit: number = 0) => {
  const response = await axios.get(
    `${API_BASE_URL}${API_ENDPOINTS.PRODUCTS}?offset=${offset}&limit=${limit}`
  );

  if (response.status !== 200) {
    throw new Error();
  }

  return response.data;
};
