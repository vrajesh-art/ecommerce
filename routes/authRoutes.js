import express from 'express'
import { registerController, loginController, testController, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController } from '../controllers/authController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
//router object
const router = express.Router();


//routing
//REGISTER||METHOD:POST
router.post('/register', registerController)
//registerController is the callback function

// LOGIN || POST
router.post("/login", loginController);;

// forgot password||POST
router.post('/forgot-password', forgotPasswordController)

//protected route
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true })
})
//protected route for admin
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true })
})
// test router

router.get('/test', requireSignIn, isAdmin, testController)

// below is the route for updating the profile
router.put('/profile', requireSignIn, updateProfileController)

// below is the auth for the orders
router.get('/orders', requireSignIn, getOrdersController);

router.get('/all-orders', requireSignIn, isAdmin, getAllOrdersController);
// below is the route for changing the status of the order
// we are using put because we are updating the staus
router.put('/order-status/:orderId', requireSignIn, isAdmin, orderStatusController)


export default router;