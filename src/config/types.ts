import { MouseEventHandler } from "react";

export type Product = {
  id: number;
  image: string;
  category: string;
  title: string;
  description: string;
  price: number;
  onClick?: MouseEventHandler;
};
