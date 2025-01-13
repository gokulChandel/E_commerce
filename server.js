
import express  from "express";
import dotenv from 'dotenv';
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import authRoutes from  './routes/authRoute.js'
import cors from 'cors'
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js'
// import router from "./routes/authRoute.js";
//configure .env
dotenv.config();

// database congigure 
connectDB();


// rest object 
const app = express();
// middleware 

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


//routes
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes)
app.use("/api/product", productRoutes);

// rest api
app.get('/',(req, res)=>{
    res.send(`<h1>Welcome to E-commerce</h1>`)
});



const PORT = process.env.PORT||8080; 


app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`);
    
})