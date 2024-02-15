import express from "express";

import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { brainTreePaymentController, braintreeTokenController, createproductController, deleteproductController, getphotoController, getproductController, getsingleproductController, productCategoryController, productCountController, productFiltersController, productListController, relatedProductController, searchProductController, updateproductController } from "../controllers/productController.js";
const router = express.Router();
import formidable from "express-formidable";
// hum formidible ko directly route mein pass kara sakte hai

// routes

// route for creating the product
// router.post('/create-product', requireSignIn, isAdmin, createproductController);
router.post('/create-product', requireSignIn, isAdmin, formidable(), createproductController);
// get products
router.get('/get-product', getproductController);

// getting the single product
router.get('/get-singleproduct/:slug', getsingleproductController)

// geting the photo
// iss photo ko hum id se nikalenge id mongodb mein automatically create hoo jaata hai
router.get('/product-photo/:pid', getphotoController)

// below is the route for deleting the product
router.delete('/delete-product/:pid', deleteproductController);

// below is the route for updating the product
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateproductController)

// below is the route for filtering
//yaha pe hum value pass kar rhe hai isliye post rahega
router.post('/product-filters', productFiltersController)

//below is the route for counting the products
router.get('/product-count', productCountController);

// below is the route for page per list
router.get('/product-list/:page', productListController)

//below is the router for searching of the product
router.get('/search/:keyword', searchProductController)

// below is the route for the similar products
router.get('/related-product/:pid/:cid', relatedProductController)

// below is the route for getting the category wise product
router.get('/product-category/:slug', productCategoryController)

// below is the router for payment routes
// token
router.get('/braintree/token', braintreeTokenController)
// below is for payments route
// below is the post method hence we need to get some info from the user
router.post('/braintree/payment', requireSignIn, brainTreePaymentController)
export default router