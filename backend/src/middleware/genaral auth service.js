import jwt from 'jsonwebtoken'

export default function verifyToken(req, res, next){
    const authHeader = req.headers['authorization']

    // reject if no token is provided 
    if(!authHeader){
        return res.status(401).json({
            sucess:false,
            message:'No token or No valid token is provided'
        })
    }

    const token = authHeader.split(' ')[1];

    try{
        const jwt_key = process.env.JWT_KEY;
        const decode = jwt.verify(token, jwt_key);
        req.user = decode;
        next();
    }catch (err){
        return res.status(500).json({
            sucess:false,
            message:`Error at Global JWT token auth: ${err}`
        })
    }
}