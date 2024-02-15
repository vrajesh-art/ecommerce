import { comparePassword, hashPassword } from "../helpers/authHelper.js"
import userModel from "../models/userModel.js"
import productModel from '../models/productModel.js'
import JWT from 'jsonwebtoken'
import orderModel from "../models/orderModel.js"

// export default registerController
export const registerController = async (req, res) => {
    try {
        //here we will use destructuring and remove the content from req.body
        const { name, email, password, phone, address, answer } = req.body
        //validations
        if (!name) {
            return res.send({ message: 'Name is Required' })
        }
        if (!email) {
            return res.send({ message: "Email is Required" })
        }
        if (!password) {
            return res.send({ message: "Password is Required" })
        }
        if (!phone) {
            return res.send({ message: "Phone is Required" })
        }
        if (!address) {
            return res.send({ message: "Address is Required" })
        }
        if (!answer) {
            return res.send({ message: "Answer is Required" })
        }

        // check user
        const existingUser = await userModel.findOne({ email })
        //here we are checking the existing user
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'Already registered pls login'
            })
        }

        //register password
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new userModel({ name, email, phone, address, password: hashedPassword, answer });
        user.save();

        res.status(201).send({
            success: true,
            message: 'User Register Successfully',
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error
        })
    }
}

// we can make it more secure using json webtoken so we are using it
// POST LOGIN



export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
            });
        }
        //check user
        const user = await userModel.findOne({ email });
        console.log(user)
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registerd",
            });
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password",
            });
        }
        //token
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        console.error('error is', error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        });
    }
};

// controller for password forgot section
export const forgotPasswordController = async (req, res) => {
    const { email, newPassword, answer } = req.body
    try {
        if (!email) {
            return res.status(400).send({ message: 'Email is required' })
        }
        if (!answer) {
            return res.status(400).send({ message: 'answer is required' })
        }
        if (!newPassword) {
            return res.status(400).send({ message: 'new password is required' })
        }
        // check karna padega ki email and password barabar hai ki nahi
        const user = await userModel.findOne({ email, answer })

        if (!user) {
            res.status(500).send({
                success: false,
                message: 'Wrong Email or Answer'
            })
        }

        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id, { password: hashed })

        res.status(200).send({
            success: true,
            message: 'password changed successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Something went wrong',
            error
        })
    }
}

// below is the route for updating the profile
export const updateProfileController = async (req, res) => {
    try {
        const { name, password, address, phone } = req.body;
        const user = await userModel.findById(req.user._id)

        // password
        if (password && password.length < 6) {
            return res.json({ error: 'password is required and should be 6 character long' })
        }
        // naya password milta hai toh usko hash karna padega agar nhi milta  toh undefined rehne dho matlabh kuch bhi karne ki zarurat nhi hai
        const hashedPassword = password ? await hashPassword(password) : undefined
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            password: hashedPassword || user.password,
            phone: phone || user.phone,
            address: address || user.address

        }, { new: true })
        res.status(200).send({
            success: true,
            message: 'password has been updated successfully',
            updatedUser
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: 'error while updating the profile',
            error
        })
    }
}

// ab hum route ko protect kar sakte hai using middleware jisme token compare karenge agar token milta hai toh iss usee route show karenge


// below is the router for getting the order
export const getOrdersController = async (req, res) => {
    try {
        const orders = await orderModel.find({ buyer: req.user._id }).populate("products", "-photo").populate("buyer", "name")
        res.json(orders);
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error while getting orders',
            error
        })
    }
}
// below is the controller for getting all the orders
// yaha pe hum admin keliye find kar rhe hai isliye hum sab cheeze lagengi
export const getAllOrdersController = async (req, res) => {
    try {
        const orders = await orderModel.find({}).populate("products", "-photo").populate("buyer", "name").sort({ createdAt: '-1' })
        res.json(orders);
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error while getting orders',
            error
        })
    }
}

// below is the controller for changing the order status
export const orderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        // update karte hai isliye new ki property joh hai woh update karna padta hai
        const orders = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true })
        res.json(orders)
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error while updating the status',
            error
        })
    }
}
// test controller
export const testController = (req, res) => {
    res.send('your protected route')
}






