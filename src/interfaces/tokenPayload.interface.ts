interface ITokenPayload {
    username: string;
    id: string;
    created_at: string;
    email: string;
    iat: number;
    exp: number;
}

export default ITokenPayload;
