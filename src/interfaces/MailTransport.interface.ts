interface IMailTransport {
    host: string | any;
    port: number | string | any;
    secure: boolean;
    auth: {
        user: string | any;
        pass: string | any;
    };
    tls: object;
}

export default IMailTransport;
