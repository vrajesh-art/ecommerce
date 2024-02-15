// here we will be creating the route for the category
import express from "express";
import { Router } from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createCategoryController, deletecategoryController, getallcategoryController, singlecategoryController, updatecategoryController } from "../controllers/categoryController.js";

const router = express.Router()

router.post('/create-category', requireSignIn, isAdmin, createCategoryController)
router.put('/update-category/:id', requireSignIn, isAdmin, updatecategoryController)
// agar user login nhi rha toh bhi category toh show karna hai
router.get('/get-category', getallcategoryController)
// single catrgory ko fetech karne ke liye
router.get('/single-category/:slug', singlecategoryController)
//category delete karne ke liye
router.delete('/delete-category/:id', requireSignIn, isAdmin, deletecategoryController)

export default router