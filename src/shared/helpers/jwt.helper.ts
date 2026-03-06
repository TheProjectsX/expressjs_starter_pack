import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { UserPayload } from "../../app/middlewares/auth";

const generateToken = (
    payload: UserPayload,
    secret: Secret,
    expiresIn: string,
): string => {
    const token = jwt.sign(payload, secret, {
        algorithm: "HS256",
        expiresIn,
    } as SignOptions);

    return token;
};

const verifyToken = (token: string, secret: Secret) => {
    return jwt.verify(token, secret) as UserPayload;
};

export const jwtHelpers = {
    generateToken,
    verifyToken,
};
