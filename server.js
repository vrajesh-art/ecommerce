import express from 'express'
import dotenv from "dotenv"
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cors from 'cors'
//configure the env
dotenv.config();
// yaha root mein hai isliye hame extra likhne ki zarurat nhi toh uske undar object bana ke likhna tah 
// dotenv.config({path:''})

// database config
connectDB();


// rest object 
const app = express();

// here are the middlewares
// cors ko middleware mein call karna padta hai
app.use(cors())
app.use(express.json())
// req and response mein apan joh hai json data object de sakte hai
app.use(morgan('dev'))

// routes

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/product', productRoutes)

// rest apis
app.get('/', (req, res) => {
    //yahape hum req ko handle kar sakte hau and jo bhi response hai usek user ko de sakte hai
    res.send("<h1> welcome to the ecommerce app</h1>")
})

// const PORT = 8080;

const PORT = process.env.PORT || 8080;
// hame appliation  ko secure karna hai development mode mein toh koi issue nhi hai par hume production mode mein ise expose nhi karna hai
app.listen(PORT, () => {
    console.log(`server is running on ${process.env.DEV_MODE} mode on port ${PORT}`)
})