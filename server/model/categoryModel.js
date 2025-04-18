import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
    {
        // Referencing another Mongoose Object - User
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: true,
            default: "Uncategorized",
        },
        type: {
            type: String,
            required: true,
            enum: ["income", "expense"],
        }
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Category', categorySchema);