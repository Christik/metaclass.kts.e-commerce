import { API_ENDPOINTS } from "@config/api";
import { getData } from "@store/data";

export const getProductsByCategory = async (id: number, limit?: number) => {
  const filter = limit ? `&offset=0&limit=${limit}` : "";

  const data = await getData(
    `${API_ENDPOINTS.PRODUCTS_BY_CATEGORY}${id}${filter}`
  );

  return data;
};
