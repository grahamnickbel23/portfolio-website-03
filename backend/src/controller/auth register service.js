import userAuthModel from "../model/userAuth Model.js";
import bcrypt from 'bcrypt'

export default function authRegister(app, authToken, adminAuth) {
    
    // routes for new user registration
    app.post('/auth/signup', async (req, res) => {
        try {
            const data = req.body;
            const hashedpassword = await bcrypt.hash(data.password, 10)
            data.password = hashedpassword;

            const newData = userAuthModel(data);
            await newData.save();

            res.status(200).json({
                sucess: true,
                message: 'User created sucessfully'
            })
        } catch (err) {
            res.status(500).json({
                sucess: false,
                message: `User Creation error: ${err}`
            })
        }
    })


    // privilaged routes for deleting exsisting user
    app.delete('/auth/user/deleate', authToken, adminAuth, async (req, res) => {
        try {
            const { email } = req.body;

            // handel empty error
            if (!email) {
                return res.status(500).json({
                    sucess: false,
                    message: 'No Email been provided to delete'
                })
            }

            // delate if user exsist
            const result = await userAuthModel.findOneAndDelete(email)

            // if user don't exist
            if (!result) {
                return res.status(404).json({
                    sucess: false,
                    message: 'User do not exist'
                })
            }

            // return if oparation is sucessful
            return res.status(200).json({
                sucess: true,
                message: 'Requested User Deleted'
            })

        } catch (err) {
            return res.status(500).json({
                sucess: false,
                message: `Requested User Deleted: ${err}`
            })
        }
    })
}