import userAuthModel from "../model/userAuth Model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default function authLogIn(app) {
    app.post('/auth/login', async (req, res) => {
        try {
            const jwt_key = process.env.JWT_KEY;
            const { email, password } = req.body;
            const user = await userAuthModel.findOne({ email });

            // cheak wheather user even exsist if not show error
            if (!user) {
                return res.status(404).json({
                    sucess: false,
                    message: 'User Not Found'
                })
            }

            // if user exisit cheack password
            const isPasswordSame = await bcrypt.compare(password, user.password)
            // if not mached show error
            if (!isPasswordSame) {
                return res.status(401).json({
                    sucess: false,
                    message: 'password did not matched'
                })
            }
            // after cheaking create token
            const token = jwt.sign(
                { userId: user._id, email: user.email },
                jwt_key,
                { expiresIn: "3d" }
            )
            // send token to user
            res.status(200).json({
                sucess: true,
                message: "Login Sucessful",
                token: token
            })
        } catch (err) {
            res.status(500).json({
                sucess: false,
                Header: "LogIn Failes",
                Error: err
            })
        }
    })
}