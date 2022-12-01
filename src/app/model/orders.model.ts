import { Address } from "./address.model";
import { Product } from "./product.model";

export class Orders {
    constructor(
        public orderId: string,
        public product : Product,
        public quantity: number,
    ) {
    }
}