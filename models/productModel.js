import mongoose from "mongoose";
import { Schema } from "mongoose";
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        // hum yahape joh hai type ko get kar rhe hai yaha pe hume ref dena padega as category joh humne categorModel mein diya tah tabhi woh relation work karega
        type: mongoose.ObjectId,
        ref: 'Category',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    // yahape joh hai photo ka issue hai mongodb mein agar hum cloud use karte hai toh wahape hume string milta hai yaha mongodb mein limit hai hum kuch 15 yaa 16 mb hii upload kar sakte hai
    photo: {
        // isme buffer use karenge jisme hum img yaa file ko save kara sakte hai
        data: Buffer,
        contentType: String
    },
    shipping: {
        type: Boolean,
    }
}, { timestamps: true })
const Product = mongoose.model('product', productSchema)
export default Product
