export class User {
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
        public zipcode: string,
        public isLocked: boolean,
        public locked:boolean
    ) {
    }
}