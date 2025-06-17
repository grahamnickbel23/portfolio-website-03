import sellerAuthModel from "../model/sellerAuth Model.js";

export default async function sellerAuth(req, res, next) {
    try {
        const email = req.user?.email
        const id = req.user?.userId;
        req.user.id = id; // user is used as the genaral middelware is sending data in res.user

        // return eror if email is missing
        if (!email) {
            return req.status(400).json({
                success: false,
                message: 'no email been provided with token'
            })
        }

        // cheak if request is from a registerd seller
        const seller = await sellerAuthModel.findOne({ email });

        if (!seller && !seller.type == 'seller') {
            return res.status(403).json({
                success: false,
                message: "access denied as it is not a registered seller"
            })
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