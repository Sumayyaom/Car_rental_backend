import dotenv from "dotenv";
import jwt from 'jsonwebtoken';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Middleware to check user role
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        const token = req.cookies.Token;

        
        if (!token) {
            return res.status(401).send({ status: false, message: 'No token provided' });
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            const userRole = decoded.role;

            if (roles.includes(userRole)) {
                req.user = decoded; 
                next(); 
            } else {
                res.status(403).send({ status: false, message: 'Access denied' });
            }
        } catch (err) {
            res.status(401).send({ status: false, message: 'Invalid token' });
        }
    };
};

export {authorizeRoles}