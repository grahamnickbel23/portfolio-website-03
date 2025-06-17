import sellerAuthModel from "../../model/sellerAuth Model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default function sellerLogin(app){

    // routes for seller login
    app.post('/auth/seller/login', async (req, res) => {
        try{
            const jwt_key = process.env.JWT_KEY
            const {email, password} = req.body;

            // cheack if any seller at all exist
            const seller = await sellerAuthModel.findOne({ email });

            if(!seller){
                return res.status(404).json({
                    success:false,
                    message:`no seller exisit with email: ${email}`
                })
            }

            // if user exisit then cheack for password
            const isPasswordSame = await bcrypt.compare(password, seller.password)
            // show error if password mismatch happend
            if(!isPasswordSame){
                return res.status(401).json({
                    success:false,
                    message:'password did not matched'
                })
            }

            // after cheaking password create token
            const token = jwt.sign(
                { userId: seller._id, email: seller.email},
                jwt_key,
                { expiresIn: "1d"}
            )

            // send token to user
            return res.status(200).json({
                success:true,
                message:`Login sucessfull with email: ${email}`,
                token: token
            })

        }catch (err){
            return res.status(500).json({
                success:false,
                message: `login failed: ${err}`
            })
        }
    })
}