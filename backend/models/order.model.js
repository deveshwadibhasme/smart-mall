import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Pending",
        enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"]
    },
    paymentMethod: {
        type: String,
        required: true,
        default: "COD"
    }
}, { timestamps: true });

const OrderModel = mongoose.model("order", OrderSchema);

export default OrderModel;
