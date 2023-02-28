import { API_ENDPOINTS } from "@config/api";
import { getData } from "@store/data";

export const getProduct = async (id: number) => {
  const data = await getData(`${API_ENDPOINTS.PRODUCTS}${id}`);

  return data;
};
