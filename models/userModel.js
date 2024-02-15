import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: {},
        required: true,
    },

    answer: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    }
},
    { timestamps: true }
    // jab bhi naya user add hoga uska time joh hai add hoo jaayega
)

const User = mongoose.model('Users', userSchema)
export default User;