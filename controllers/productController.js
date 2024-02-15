import productModel from "../models/productModel.js";
//callback function hai isliye req and res receive karta hai
import categoryModel from '../models/categoryModels.js'
import orderModel from "../models/orderModel.js"
import fs from 'fs'
import slugify from "slugify";
import braintree from "braintree";
import dotenv from 'dotenv'
dotenv.config();

// below we are creating the payment gateway

console.log('public key', process.env.BRAINTREE_PUBLIC_KEY)
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
})
export const createproductController = async (req, res) => {
    try {
        //yahape ek issue hai ki hamare pass photo hai and apan photo ko direct access nhi kar sakte photo form data ke amdat se aaata hai directly karenge to string ki value lega photo ki value nhi lega iske liye hum package install karenge express-formidable
        // yahape images hai yaha pe abtak hum req.body se data ko get karte teh ab jum fields se data ko get karenge
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        switch (true) {
            case !name: {
                return res.status(500).send({ error: 'name is required' });
            }
            case !description: {
                return res.status(500).send({ error: 'description is required' });
            }
            case !price: {
                return res.status(500).send({ error: 'price is required' });
            }
            case !category: {
                return res.status(500).send({ error: 'category is required' });
            }
            case !quantity: {
                return res.status(500).send({ error: 'quantity is required' });
            }

            case photo && photo.size > 1000000: {
                return res.status(500).send({ error: 'photo is required and should be less than 1mb' });
            }
        }
        const products = new productModel({ ...req.fields, slug: slugify(name) })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.ContentType = photo.type
        }

        await products.save();
        res.status(201).send({
            success: true,
            message: 'product has been created successfully',
            products
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error while creating the product',
            error
        })
    }
}
// this is the controller for getting all the products

export const getproductController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            // product.length karne se hame products ke length milmsakte hai
            totalCount: products.length,
            message: "All products",
            products,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting products',
            error: error.message
        })
    }

}

// this is the controller for getting the single object
// callback function hai isliye yeh ek req and res receive karega
export const getsingleproductController = async (req, res) => {
    try {
        const { slug } = req.params;
        const product = await productModel.findOne({ slug }).select('-photo').populate('category')
        res.status(200).send({
            success: true,
            message: 'single product has been fetched',
            product
        })
    } catch (error) {
        console.log(error);
        req.status(500).send({
            success: false,
            message: 'Error while fetching the single product',
            error
        })

    }
}

// controller for getting the photo
export const getphotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select('photo');
        if (product.photo.data) {
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data)
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while fetching the photo',
            error

        })
    }
}

// controller for deleting the product

export const deleteproductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select('-photo');
        res.status(200).send({
            success: true,
            message: 'product has been deleted successfully',

        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while deleting the product',
            error
        })
    }
}

// below is the Controller for updating the product
export const updateproductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files
        switch (true) {
            case !name: {
                return res.status(500).send({ error: 'name is required' });
            }
            case !description: {
                return res.status(500).send({ error: 'description is required' });
            }
            case !price: {
                return res.status(500).send({ error: 'price is required' });
            }
            case !category: {
                return res.status(500).send({ error: 'category is required' });
            }
            case !quantity: {
                return res.status(500).send({ error: 'quantity is required' });
            }

            case photo && photo.size > 1000000: {
                return res.status(500).send({ error: 'photo is required and should be less than 1mb' });
            }

        }
        // yaha pe new ko true karna zaruri hai warna update nhi hooga
        const products = await productModel.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify(name) }, {
            new: true
        })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type
        }

        await products.save();
        res.status(201).send({
            success: true,
            message: 'Product has been successfully updated',
            products
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while updating the product',
            error
        })
    }
}


// this is the controller for filters
export const productFiltersController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        // below we are creating an empty javascript object
        let args = {};
        //if below is true it assigns checked array to args.category
        if (checked.length > 0) args.category = checked;
        // if below is true it creates an object for args.price
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            products
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'errors while filtering the product',
            error
        })
    }
}

// below is the function for counting the products

export const productCountController = async (req, res) => {
    try {
        const count = await productModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            success: true,
            count,
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: 'error in counting the product',
            success: false,
            error,
        })
    }
}

// below is the controller for products per page

export const productListController = async (req, res) => {
    try {
        const perpage = 6;
        const page = req.params.page ? req.params.page : 1;
        const products = await productModel.find({}).select('-photo').skip((page - 1) * perpage).limit(perpage).sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            products
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'error in products per page',
            success: false,
            error,
        })
    }
}


// below is the product for searching the product
export const searchProductController = async (req, res) => {
    try {

        // idhar hum keywords ko params mein se expect karenge
        const { keyword } = req.params;
        const results = await productModel.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        }).select('-photo')
        // options mein i dene se woh case insensitive ban jaayega
        //in the below line of code we are providing the result in the form of json
        res.json(results)


    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            error,
            message: 'Error in searching the product'
        })
    }
}

//below is the controller for finding the si,ilar product
export const relatedProductController = async (req, res) => {
    try {
        // by destructuring take the cid and the pid from req.params
        const { pid, cid } = req.params
        const products = await productModel.find({
            category: cid,
            // ne apan use kar rhe hai kyuki hume use nhi karna hai
            _id: { $ne: pid }

        }).select('-photo').limit(3).populate("category")
        res.status(200).send({
            success: true,
            products

        })

    } catch (error) {
        console.log(error),
            res.status(400).send({
                success: false,
                message: 'error while finding the similar products',
                error
            })
    }
}

// below is the controller for the product categorywise controller

export const productCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug })
        const products = await productModel.find({ category }).populate('category')
        res.status(200).send({
            success: true,
            category,
            products
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            error,
            message: 'error while getting the products'
        })
    }
}

// below is the controller for the token
export const braintreeTokenController = async (req, res) => {
    try {
        // hume yahape token ko get karna hai aur joh token hain woh gateway mein se aayega
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.send(response)
            }
        })
    } catch (error) {
        console.log(error);
    }
}

// below is the controller for the payment
export const brainTreePaymentController = async (req, res) => {
    try {
        const { cart, nonce } = req.body;
        let total = 0;
        cart?.map((item) => {
            total = total + item.price;

        })

        let newTransaction = gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: "nonce",
            options: {
                // kya kya cheeze hum accept karenge woh batayenge
                submitForSettlement: true,
            },
        }, function (error, result) {
            if (result) {
                const order = new orderModel({
                    products: cart,
                    payment: result,
                    buyer: req.user._id,
                    // req.user._id joh hai woh apan ne joh requiresignin the middleware add kiya hai na usse aayegi


                }).save()
                res.json({ ok: true })

            }
            else {
                res.status(500).send(error);
                // status 500 means internal server error
            }

        }

        )
        // model create karenge aur orders ko as a schema store kara denge
    } catch (error) {
        console.log(error)
    }
}