import * as express from "express"
declare global {
    namespace Express {
        interface Request {
            user? : Record<string,number,any>
        }
    }
}