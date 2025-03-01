import express from 'express';
import userRouter from './routes/userRoute.js';
import categoryRouter from './routes/categoryRoute.js';
import transactionRouter from './routes/transactionRoute.js';
import mongoose from 'mongoose';
import errorHandler from './middleware/errorHandler.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

// Connect to Database
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Database Connected!!"))
    .catch((e) => console.log(e));

// Middlewares
app.use(express.json()); // Passes incoming JSON data
app.use('/', userRouter);
app.use('/', categoryRouter);
app.use('/', transactionRouter);
app.use(errorHandler);

// Launch the Server
app.listen(process.env.PORT, (err) => {
    if(err) {
        console.error(err);
    }
    else{
        console.log(`Server running on http://localhost:${process.env.PORT}`);
    }
});