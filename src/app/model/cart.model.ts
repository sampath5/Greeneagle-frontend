import { Product } from "./product.model";
import { User } from "./user.model";

export class Cart {
    constructor(
        public cartId: string,
        public prod: Product,
        public quantity:number,
        public user:User,
        public visible:boolean,
    ) {
    }
}