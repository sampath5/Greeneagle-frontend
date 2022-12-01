import { Product } from "./product.model";
import { User } from "./user.model";

export class WishList {
    constructor(
        public wishlistId:number,
        public product: Product,
        public user:User,
        public visible:boolean,
    ) {
    }
}