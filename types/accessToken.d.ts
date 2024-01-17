export interface AccessTokenType {
    userId: string;
    name: string;
    email: string;
    exp:  number;
    iat?: number;
}