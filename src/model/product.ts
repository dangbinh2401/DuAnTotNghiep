import { Category } from "./category";

export class Product {
    productId!: any;
    name!: string;
    quantity!: number;
    unitPrice!:number;
    discount!: number;
    enteredDate!: Date;
    image!: string;
    description!: string;
    category!: Category;

}