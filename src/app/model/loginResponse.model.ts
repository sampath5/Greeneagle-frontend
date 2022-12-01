export class LoginResponse {
    constructor(
        public error: string,
        public jwtToken: string,
        public statusCode: string,
        public userName: string,
        public role: string,
    ) {
    }
}