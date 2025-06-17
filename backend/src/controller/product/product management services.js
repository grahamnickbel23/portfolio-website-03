import productModel from "../../model/product Model.js";
import categoryModel from "../../model/category Model.js";

export default function productUpdateServices(app, genaralToken, adminToken, properJson){

    // product upload api path
    app.post('/product/upload', genaralToken, adminToken, properJson, async (req, res) => {
        try{
            const data = req.body;
            const {title, description, price, currency, category} = req.body;
            const sellerId = req.user.id;  // user is used as the genaral middelware is sending data in res.user
            data.seller = sellerId;  // adding seller's id to product schema

            // find matching entry
            const fullMatch = await productModel.findOne({title, description, price, currency, category})
            const titleMatch = await productModel.findOne({title});
            const catagoryMatch = await categoryModel.findOne({category});

            // error if product already exisit
            if(fullMatch){
                return res.status(409).json({
                    sucess:false,
                    message: "product already exisit"
                })
            }

            // if title match
            if(titleMatch){
                return res.status(409).json({
                    sucess:false,
                    messsage:`title already exist: ${title}`
                })
            }

            // if catagory don't exist
            if(!catagoryMatch){
                return res.status(404).json({
                    sucess:false,
                    message:`catagory don't exist: ${category}`
                })
            }

            // if all cheack passed save
            const newProduct = productModel(data);
            await newProduct.save();

            // return sucess after job is complete
            return res.status(200).json({
                sucess:true,
                message: `Product uploaded sucessfully: ${title}`
            })

        }catch (err){
            return res.status(500).json({
                message:false,
                message:`product upload error : ${err}`
            })
        }
    })

    // product deleate api
    app.delete('/product/delete', genaralToken, adminToken, async (req, res) => {
        try{
            const { title } = req.body;

            // bad request handelling
            if(!title){
                return res.status(400).json({
                    success:false,
                    message:'no title is provided'
                })
            }

            // henadle wrong name error
            const titleExist = await productModel.findOne({title});

            if(!titleExist){
                return res.status(404).json({
                    sucess:false,
                    message:'title do not exist'
                })
            }

            // delate if product exist
            const result = await productModel.findOneAndDelete({title});

            // sucess return
            return res.status(200).json({
                sucess:true,
                message:`product deleted sucessfully: ${title}`
            })

        }catch (err){
            return res.status(500).json({
                sucess:false,
                message:`failed to delete product: ${err}`
            })
        }
    })

    // product update api
    app.patch('/product/upload', genaralToken, adminToken, async (req, res) => {
        try{
            const {id,...updates} = req.body;

            // cheack if id atall exist
            const product = await productModel.findById(id);

            if(!product){
                return res.status(404).json({
                    success:false,
                    message:`product id not found: ${id}`
                })
            }

            // update requested filed
            Object.assign(product, updates);
            await product.save();

            return res.status(200).json({
                success:true,
                message: `product updated sucessfully: ${product.title}`,
                details: `edited product id: ${id}`
            })
        }catch (err){
            return res.status(500).json({
                success:false,
                message: `error updating product: ${err}`
            })
        }
    })
}