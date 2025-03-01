import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        // Referencing another Mongoose Object - User
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        // Referencing another Mongoose Object - Category
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now(),
        },
        description: {
            type: String,
            required: false,
        }
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Transaction', transactionSchema);