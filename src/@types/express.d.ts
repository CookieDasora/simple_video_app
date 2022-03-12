/* eslint-disable no-unused-vars */
import * as express from 'express';
import ITokenPayload from '../interfaces/TokenPayload.interface';

declare global {
    namespace Express {
        interface Request {
            user? : ITokenPayload,
        }
    }
}
