import { CategoryApi, CategoryModel, normalizeCategory } from "./category";

export type ProductApi = {
  id: number;
  images: string[];
  category: CategoryApi;
  title: string;
  description: string;
  price: number;
};

export type ProductModel = {
  id: number;
  images: string[];
  category: CategoryModel;
  title: string;
  description: string;
  price: number;
};

export const normalizeProduct = (from: ProductApi): ProductModel => ({
  id: from.id,
  images: from.images,
  category: normalizeCategory(from.category),
  title: from.title,
  description: from.description,
  price: from.price,
});
