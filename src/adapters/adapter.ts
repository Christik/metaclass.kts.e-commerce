import { Product } from "@config/types";

type OriginalProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
};

const adaptProduct = (product: OriginalProduct): Product => {
  const { id, images, title, description, price, category } = product;
  const adaptedProduct = {
    id,
    image: images[0],
    category: category.name,
    title,
    description,
    price,
  };

  return adaptedProduct;
};

export default adaptProduct;
