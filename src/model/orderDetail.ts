import { cartItems } from "./cartItems";

export class OrderDetail {
    name!: string;
    imageUrl!: string;
    unitPrice!: number;
    quantity!: number;
    productId!: any;

    constructor(cartItem: cartItems) {
        this.name = cartItem.name;
        this.imageUrl = cartItem.imageUrl;
        this.quantity = cartItem.quantity;
        this.unitPrice = cartItem.unitPrice;
        this.productId = cartItem.id;
    }
}