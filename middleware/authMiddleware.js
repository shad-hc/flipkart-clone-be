import jwt from "jsonwebtoken";

export const userAuthMiddleware = async(req,res,next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token,process.env.USER_JWT_SECRET);
    if(!decoded){
        res.json({
            message : "unauthorized user"
        })
         return;
    }
    req.userId = decoded.userId;
    next();
}

export const adminAuthMiddleware = async(req,res,next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token,process.env.ADMIN_JWT_SECRET);
    if(!decoded){
        res.json({
            message : "unauthorized user"
        })
         return;
    }
    req.userId = decoded.userId;
    next();
}