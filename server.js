import express, { application } from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoutes.js'
import productRouter from './routes/productRoutes.js'
import cartRouter from './routes/cartRoutes.js'
import orderRouter from './routes/orderRoutes.js'
import reviewRouter from './routes/reviewRoutes.js'



// App Config
const app=express()
const port=process.env.PORT || 4000
connectDB()
connectCloudinary()

// Middlewares
app.use(express.json())

// CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or Postman)
        if (!origin) return callback(null, true);
        
        // Allow localhost
        if (origin.includes('localhost')) return callback(null, true);
        
        // Allow Netlify and Vercel domains
        if (origin.endsWith('.netlify.app') || origin.endsWith('.vercel.app')) {
            return callback(null, true);
        }
        
        // Allow specific origins if you have custom domains
        const allowedOrigins = [
            'http://localhost:3000',
            'http://localhost:5173',
            'http://localhost:5174'
        ];
        
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        
        callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token', 'x-requested-with'],
    exposedHeaders: ['Content-Length', 'Content-Type'],
    maxAge: 86400
};

app.use(cors(corsOptions))

// Handle preflight requests
app.options('*', cors(corsOptions))

// api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.use('/api/review',reviewRouter)

app.get('/',(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>console.log('Server working on PORT: '+port))
