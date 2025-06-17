import productModel from "../../model/product Model.js";
import sellerAuthModel from "../../model/sellerAuth Model.js";
import userAuthModel from "../../model/userAuth Model.js";

export default function productView(app, genralToken, userAuth) {

    // product view path
    app.get('/product', genralToken, userAuth, async (req, res) => {
        try {
            const data = await productModel.find();

            // return response
            return res.status(200).json(data);

        } catch (err) {
            return res.status(500).json({
                sucess: false,
                message: `product details get failed: ${err}`
            })
        }
    })

    // Product purchase
    app.post('/product/buy', genralToken, userAuth, async (req, res) => {
        try {
            const { productId } = req.body;
            const userId = req.user.id;

            // Check if product exists
            const product = await productModel.findById(productId);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Product ID not found: ${productId}`
                });
            }

            // Update seller's sold list
            const sellerId = product.seller;
            const seller = await sellerAuthModel.findById(sellerId);
            if (seller) {
                seller.sold.push(product._id);
                await seller.save();
            }

            // Update user's purchased products
            const user = await userAuthModel.findById(userId);
            if (user) {
                user.products.push(product._id);
                await user.save();
            }

            return res.status(200).json({
                success: true,
                message: `User purchased: ${product.title}`
            });

        } catch (err) {
            return res.status(500).json({
                success: false,
                message: `Purchase error: ${err}`
            });
        }
    });

}