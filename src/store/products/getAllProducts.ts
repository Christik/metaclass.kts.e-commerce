import { API_ENDPOINTS } from "@config/api";
import { getData } from "@store/data";

export const getAllProducts = async (offset: number = 0, limit: number = 0) => {
  const data = await getData(
    `${API_ENDPOINTS.PRODUCTS}?offset=${offset}&limit=${limit}`
  );

  return data;
};
