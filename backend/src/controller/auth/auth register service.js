import userAuthModel from "../../model/userAuth Model.js";
import bcrypt from 'bcrypt'

export default function authRegister(app, doubleAuth, genaralToken, adminToken) {
    
    // routes for new user registration
    app.post('/auth/user/signup', doubleAuth, async (req, res) => {
        try {
            const data = req.body;
            const {email} = req.body

            // cheack if user already registered
            const user = await userAuthModel.findOne({email});
            
            if(user){
                return res.status(401).json({
                    sucess:false,
                    message: 'User already Exist'
                })
            }

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
    app.delete('/auth/user/signup', genaralToken, adminToken, async (req, res) => {
        try {
            const { email } = req.body;

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

    // privilaged routes for list of all user
    app.get('/auth/user', genaralToken, adminToken, async (req, res) => {
        try{

            const data = await userAuthModel.find().select('-password');
            return res.status(200).json(data)

        }catch (err){
            return res.status(500).json({
                success:false,
                message:`user get error: ${err}`
            })
        }
    })
}