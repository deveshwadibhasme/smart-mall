import express from 'express';
import cors from 'cors';
import { connectDB } from './configs/connect-db.js';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js'
import productRoute from './routes/product.route.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());

connectDB()

app.use('/api/auth', authRouter)
app.use('/api/data', productRoute)

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
