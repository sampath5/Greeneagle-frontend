export class SignupUser {
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public phone: string,
        public aptNo: string,
        public street: string,
        public city: string,        
        public state: string,
        public zipcode: string
    ) {
    }
}