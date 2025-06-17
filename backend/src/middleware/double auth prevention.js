import userAuthModel from "../model/userAuth Model.js";
import sellerAuthModel from "../model/sellerAuth Model.js";

// perpous of this middlewere is to prevent one email to be used in both user and seller signup

export default async function doubleAuthPrevention(req, res, next) {

    // filter out bad response
    const requiredField = ['type', 'email', 'password'];

    for (const field of requiredField) {
        if (!req.body[field]) {
            return res.status(400).json({
                sucess: false,
                message: `Your input is missing: ${field}`
            })
        }
    };

    try {
        const { type, email } = req.body;
        if (type == 'user') {
            // find if the email already registered as seller
            const seller = await sellerAuthModel.findOne({ email });
            if (seller) {
                return res.status(409).json({
                    sucess: false,
                    message: `email already registered as seller: ${email}`
                })
            }
        } else {
            // find if the email already registered as buyer
            const user = await userAuthModel.findOne({ email });
            if (user) {
                return res.status(409).json({
                    sucess: false,
                    message: `email already registered as user: ${email}`
                })
            }
        }

        // push to next function
        next();
        
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `error in indentification of signup: ${err}`
        })
    }
}