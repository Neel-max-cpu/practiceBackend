import jwt from 'jsonwebtoken'

const JWT_SECRET = "hehe";

export function authentication(req, res, next){
    const tokenHeader = req.headers.authorization;

    if(!tokenHeader){
        return res.status(400).send("Token missing!");
    }

    try {
        const decode = jwt.verify(tokenHeader, JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        return res.status(400).send("expired or wrong token");
    }
}