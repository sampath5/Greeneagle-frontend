export class CancelOrder {
    constructor(
        public invoiceId: string,
        public cancellationReason: string
    ) {
    }
}