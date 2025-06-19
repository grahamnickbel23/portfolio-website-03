import userAuthModel from "../model/userAuth Model.js";

export default async function userAuth(req, res, next) {
    try {
        const email = req.user?.email

        // return eror if email is missing
        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'no email been provided with token'
            })
        }

        // cheack if request is from a registerd user
        const user = await userAuthModel.findOne({ email });

        if (!user) {
            return res.status(403).json({
                success: false,
                message: "access denied as it is not a registered userr"
            })
        }

        // cheak wheather user is admin
        if(email == process.env.ADMIN_EMAIL){
            const adminEmail = true;
            req.user.admin = adminEmail;
        }
        
        // push for next middeleware
        next();

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Seller auth error: ${err.message}`,
        });
    }
}