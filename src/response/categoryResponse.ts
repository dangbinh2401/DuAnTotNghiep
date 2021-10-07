import { Category } from "src/model/category";

export interface ResponseCategories {
    content: Category[];
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }