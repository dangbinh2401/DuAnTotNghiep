import { Product } from "./product";

export class cartItems {
    id!: string;
    name!: string;
    imageUrl!: string;
    unitPrice!: number;
    quantity!: number;

    constructor(product: Product){
        this.id = product.productId;
        this.name = product.name;
        this.imageUrl = product.image;
        this.unitPrice = product.unitPrice;
        this.quantity = 1
    }
}