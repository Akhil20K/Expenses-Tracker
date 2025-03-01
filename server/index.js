import express from 'express';
import userRouter from './routes/userRoute.js';
import mongoose from 'mongoose';
import errorHandler from './middleware/errorHandler.js';
const app = express();
const PORT = 8080;

// Connect to Database
mongoose.connect('mongodb://localhost:27017/ExpensesTracker')
    .then(() => console.log("Database Connected!!"))
    .catch((e) => console.log(e));

// Middlewares
app.use(express.json()); // Passes incoming JSON data
app.use('/', userRouter);
app.use(errorHandler);

// Launch the Server
app.listen(PORT, (err) => {
    if(err) {
        console.error(err);
    }
    else{
        console.log(`Server running on http://localhost:${PORT}`);
    }
});