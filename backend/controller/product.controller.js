
import ProductModel from "../models/product.model.js";

const uploadProduct = async (req, res) => {
    try {
        const { name, price, description, category, stock } = req.body;
        const image = req.file ? req.file.path : "";

        const newProduct = new ProductModel({
            name, price, description, category, image: image, stock
        });

        await newProduct.save();
        res.status(201).json({ type: "success", message: "Product uploaded successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ type: "error", message: error.message });
    }
};

const fetchProduct = async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.status(200).json({ type: "success", products });
    } catch (error) {
        res.status(500).json({ type: "error", message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await ProductModel.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ type: "error", message: "Product not found" });
        }
        res.status(200).json({ type: "success", message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ type: "error", message: error.message });
    }
};

export { uploadProduct, fetchProduct, deleteProduct }