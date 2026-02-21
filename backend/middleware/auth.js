import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ type: "error", message: "No token, authorization denied" });
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        req.user = decodedData;

        next();
    } catch (error) {
        res.status(401).json({ type: "error", message: "Token is not valid" });
    }
};

export default auth;
