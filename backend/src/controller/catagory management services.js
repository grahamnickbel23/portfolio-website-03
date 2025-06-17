import categoryModel from "../model/category Model.js";

export default function catagoryUpdateServices(app, genaralToken, adminToken){

    // catagory creation api
    app.post('/product/catagory/upload', genaralToken, adminToken, async (req, res) => {
        try{
            const {category} = req.body;

            // cheack if catagory already exisst
            const catagoryExist = await categoryModel.findOne({category});

            if(catagoryExist){
                return res.status(409).json({
                    success:false,
                    message:`catagory already exist: ${category}`
                })
            }

            // creation of new catagory
            const newCatagory = categoryModel({category});
            await newCatagory.save()

            // return sucess
            return res.status(200).json({
                success:true,
                message:`catagory creation sucessful: ${category}`
            })
        }catch (err){
            return res.status(500).json({
                success:false,
                message:`catagory creation failed: ${err}`
            })
        }
    })

    // catagory deletetion api
    app.delete('/product/catagory/upload', genaralToken, adminToken, async (req, res) => {
        try{
            const {category} = req.body;

            // cheack if catagory exisst
            const catagoryExist = await categoryModel.findOne({category});

            if(!catagoryExist){
                return res.status(409).json({
                    success:false,
                    message:`catagory do not exist: ${category}`
                })
            }

            // deletation of new catagory
            const newCatagory = categoryModel(category);
            await newCatagory.save()

            // return sucess
            return res.status(200).json({
                success:true,
                message:`catagory delete is sucessful: ${category}`
            })
        }catch (err){
            return res.status(500).json({
                success:false,
                message:`catagory delete failed: ${err}`
            })
        }
    })

    // update all category
    app.patch('/product/category/upload', genaralToken, adminToken, async (req, res) => {
        try{
            const {id, ...update} = req.body;

            // cheack if id at all exist
            const category = await categoryModel.findById(id);

            if(!category){
                return res.status(404).json({
                    success:false,
                    message:`category id not found: ${id}`
                })
            }

            //update requested category
            Object.assign(category, update);
            await category.save();

            return res.status(200).json({
                success:true,
                message: `category updated sucessfully: ${category.category}`,
                details: `edited category id: ${id}`
            })
        }catch (err){
            return res.status(500).json({
                success:false,
                message: `error updating category: ${err}`
            })
        }
    })

    // getting all category
    app.get('/product/catagory', genaralToken, adminToken, async (req, res) => {
        try{
            const data = await categoryModel.find();
            return res.status(200).json(data);
        }catch (err){
            return res.status(500).json({
                success:false,
                message:`product get error: ${err}`
            })
        }
    })
}