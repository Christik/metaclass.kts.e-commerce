import { API_BASE_URL, API_ENDPOINTS } from "@config/api";
import axios from "axios";

const getProducts = async () => {
  const response = await axios.get(
    `${API_BASE_URL}${API_ENDPOINTS.PRODUCTS}?offset=0&limit=9`
  );

  if (response.status !== 200) {
    throw new Error();
  }

  return response.data;
};

export default getProducts;
