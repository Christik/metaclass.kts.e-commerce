import adaptProduct from "@adapters/adapter";
import { API_BASE_URL, API_ENDPOINTS } from "@config/api";
import axios from "axios";

const getProduct = async (id: number) => {
  const response = await axios.get(
    `${API_BASE_URL}${API_ENDPOINTS.PRODUCTS}${id}`
  );

  if (response.status !== 200) {
    throw new Error();
  }

  return adaptProduct(response.data);
};

export default getProduct;
