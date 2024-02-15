import mongoose from "mongoose";
import { Schema } from "mongoose";
const orderSchema = new mongoose.Schema({
    // products jo hooga ek array hooga isliye usse direct display karadenge
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
    },],
    payment: {},
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",

    },
    // enum matlabh as a selectbox joh ki values leta hai
    status: {
        type: String,
        default: 'Not Process',
        enum: ["Not Process", "Processing", "Delivered", "Shipped", "Cancelled"]
    }
}, { timestamps: true })

const Order = mongoose.model('Order', orderSchema)
export default Order;