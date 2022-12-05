import { UserOrders } from "./userOrders.model";

export class UserTransaction {
    constructor(
        public amount: number,
        public invoiceId: number,
        public orders: UserOrders[],
        public paymentStatus: boolean,
        public transactionDate: Date,
        public productQuantity: number
    ) {
    }
}