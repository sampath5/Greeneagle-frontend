import { User } from "./user.model";

export class Address {
    constructor(
        public addressId: string,        
        public aptNo: string,       
        public street: string,        
        public city: string,
        public state: string,
        public user: User,
        public zip: string,
    ) {
    }
}