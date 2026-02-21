import OrderModel from "../models/order.model.js";

const uploadProduct = async (req, res) => {
    const userId = req.user.id
    try {
        const { products, totalAmount, address, paymentMethod } = req.body;

        const newOrder = new OrderModel({
            userId,
            products,
            totalAmount,
            address,
            paymentMethod
        });

        await newOrder.save();
        res.status(201).json({ type: "success", message: "Order created successfully", order: newOrder });
    } catch (error) {
        res.status(500).json({ type: "error", message: error.message });
    }
};

export { uploadProduct };
