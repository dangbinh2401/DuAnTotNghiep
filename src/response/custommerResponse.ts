import { Custommer } from "src/model/custommer";

export interface ResponseCustommers {
    content: Custommer[];
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }