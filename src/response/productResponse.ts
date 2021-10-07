import { Product } from "src/model/product";

export interface ResponseProducts {
    content: Product[];
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }