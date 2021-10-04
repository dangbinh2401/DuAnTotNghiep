import { Custommer } from "./custommer";
import { Order } from "./order";
import { OrderDetail } from "./orderDetail";

export class Purchase {
    custommer!: Custommer;
    order!: Order;
    orderDetails!: OrderDetail[];
}