export default function adminAuth(req, res, next){
    try{
        const user = req.user;

        // cheack if it's admin
        if(!user || user.email !== process.env.ADMIN_EMAIL){
            return res.status(403).json({
                sucess:false,
                message:'User is not an admin'
            })
        }

        // for next middlewere if user an admin
        next();
    }catch (err){
        return res.status(500).json({
            sucess:false,
            message:`Error at admin verification: ${err}`
        })
    }
}