/* eslint-disable no-unused-vars */
import * as express from 'express';
import ITokenPayload from '../interfaces/tokenPayload.interface';

declare global {
    namespace Express {
        interface Request {
            user? : ITokenPayload
        }
    }
}
