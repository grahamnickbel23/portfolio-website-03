import sellerAuthModel from "../../model/sellerAuth Model.js";
import bcrypt from 'bcrypt'

export default function sellerRegister(app, doubleAuth, genaralToken, adminToken){

    //routes for new seller registration
    app.post('/auth/seller/signup', doubleAuth, async (req, res) => {
        try{
            const data = req.body;
            const { email } = req.body;

            // cheack if user already exist 
            const seller = await sellerAuthModel.findOne({email});

            if(seller){
                return res.status(409).json({
                    success:false,
                    message:`email already exisit: ${email}`
                })
            }

            // create account if user passed and has password
            const hashedpassword = await bcrypt.hash(data.password, 10)
            data.password = hashedpassword;

            const newCredential = sellerAuthModel(data);
            await newCredential.save();

            res.status(200).json({
                success:true,
                message:`new account created sucessfully: ${email}`
            })

        }catch (err){
            return res.status(500).json({
                sucess:false,
                message:`seller account creation error: ${err}`
            })
        }
    })

    // previlaged routes for deleting exisiting seller
    app.delete('/auth/seller/signup', genaralToken, adminToken, async(req, res) => {
        try{
            const { email } = req.body;
            
            // cheack if seller exist
            const seller = await sellerAuthModel.findOne({ email });

            if(!seller){
                return res.status(404).json({
                    sucess:false,
                    message:`no seller account found with the email: ${email}`
                })
            }

            // if  found deleate
            await sellerAuthModel.findOneAndDelete({ email });

            return res.status(200).json({
                success:true,
                message:`succesfuly deleted: ${email}`
            })
        } catch (err){
            return res.status(500).json({
                success:false,
                message:`failed to delete seller account: ${err}`
            })
        }
    })

    // previlaged route for list of all seller
    app.get('/auth/seller', genaralToken, adminToken, async (req, res) => {
        try{

            const data = await sellerAuthModel.find().select('-password');
            return res.status(200).json(data);

        }catch (err) {
            return res.status(500).json({
                success:false,
                message:`failed to get seller list: ${err}`
            })
        }
    })
}