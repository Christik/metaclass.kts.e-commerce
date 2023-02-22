import axios from "axios";

import adaptProduct from "./adapter";

const getProducts = async () => {
  try {
    const response = await axios.get(
      "https://api.escuelajs.co/api/v1/products?offset=0&limit=9"
    );

    if (response.status !== 200) {
      throw new Error();
    }

    return response.data.map(adaptProduct);
  } catch (error) {}
};

export default getProducts;
