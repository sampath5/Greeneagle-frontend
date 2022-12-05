import { Address } from "./address.model";
import { Orders } from "./orders.model";

export class UserOrders {
    constructor(
        public invoiceId: string,
        public amount: string,
        public orderedDate: Date,
        public address: Address,
        public productList: Orders[],
        public status: boolean,
        public quantity : number
    ) {
    }
}