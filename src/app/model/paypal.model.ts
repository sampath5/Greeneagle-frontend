export class PaypalSuccess {
    constructor(
        public PayerID: string,
        public paymentId: string,
        public token: string
    ) {
    }
}