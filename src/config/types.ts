import { MouseEventHandler } from "react";

export type Category = {
  id: number;
  name: string;
  image: string;
};

export type Product = {
  id: number;
  images: string[];
  category: Category;
  title: string;
  description: string;
  price: number;
  onClick?: MouseEventHandler;
};
