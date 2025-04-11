import jwt from "jsonwebtoken";
const JWT_SECRET = "hehe";
export function authentication(req, res, next){
    const tokenHeader = req.headers.authorization;

    if (!tokenHeader) {
        return res.status(401).json({ message: "Token missing" });
    }

    try {
        const decoded = jwt.verify(tokenHeader, JWT_SECRET);
        req.user = decoded; // store decoded info on request
        next(); // pass control to the next handler
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};