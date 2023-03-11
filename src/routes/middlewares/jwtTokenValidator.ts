import { JWT } from "@server/utils/Jwt";
import { Request, Response } from "express";

export const validateJwtMiddleWare = (req: Request, res: Response, next) => {
    try {
        console.log(req.headers);
        const { authorization } = req.headers;
        const token = authorization.replace('Bearer ', '');
        let decodedJWT;
        if (decodedJWT = JWT.verifyJWT(token)) {
            console.log('Auth OK', decodedJWT);
            req["user"] = decodedJWT;
            return next();
        }
        return res.status(403).json({ error: "invalid token" });
    } catch (error) {
        console.error("jwtValidator", error);
        return res.status(403).json({ error: "Invalid Token" });
    }
}
