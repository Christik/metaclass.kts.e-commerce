import { API_BASE_URL } from "@config/api";
import axios from "axios";

export const getData = async (url: string) => {
  const response = await axios.get(`${API_BASE_URL}${url}`);

  if (response.status !== 200) {
    throw new Error();
  }

  return response.data;
};
