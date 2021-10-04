import { Custommer } from "./custommer";
import { OrderDetail } from "./orderDetail";

export class OrderHistory {
    id!: number;
    orderTrackingNumber!: string;
    status!: number;
    totalPrice!: number;
    totalQuantity!: number;
    dateCreated!: Date;
    phone!: string;
    adress!: string;
    custommer!: Custommer;
    orderDetail!: OrderDetail;
}