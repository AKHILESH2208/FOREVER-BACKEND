import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import 'dotenv/config';
import connectDB from '../../config/mongodb.js';
import connectCloudinary from '../../config/cloudinary.js';
import userRouter from '../../routes/userRoutes.js';
import productRouter from '../../routes/productRoutes.js';
import cartRouter from '../../routes/cartRoutes.js';
import orderRouter from '../../routes/orderRoutes.js';
import reviewRouter from '../../routes/reviewRoutes.js';

const app = express();

// Connect to database and cloudinary
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());

// CORS configuration - Allow all origins
const corsOptions = {
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token', 'x-requested-with'],
    exposedHeaders: ['Content-Length', 'Content-Type'],
    maxAge: 86400,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// API endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/review', reviewRouter);

app.get('/', (req, res) => {
    res.send('API Working on Netlify');
});

export const handler = serverless(app);
