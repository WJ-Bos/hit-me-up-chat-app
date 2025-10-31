export interface SignInRequest {
    usernameOrEmail: string;
    password: string;
}

export interface SignUpRequest {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface AuthResponse {
    token: string;
    tokenType: string;
    userId: number;
    username: string;
    email: string;
    message: string;
}

export interface User {
    id: number;
    username: string;
    email: string;
}