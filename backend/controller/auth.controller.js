import AdminModel from '../models/admin.model.js';
import UserModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()

const adminSignUp = async (req, res) => {
    try {
        const { nameOfVendor, nameOfStore, email, password, Number, city } = req.body;
        const existingAdmin = await AdminModel.findOne({ email });
        if (existingAdmin) return res.status(400).json({ type: "error", message: "Admin already exists" });

        const hashedPassword = await bcrypt.hash(password, 12);
        const newAdmin = new AdminModel({ nameOfVendor, nameOfStore, email, password: hashedPassword, Number, city });
        await newAdmin.save();

        res.status(201).json({ type: "success", message: "Admin registered successfully" });
    } catch (error) {
        res.status(500).json({ type: "error", message: error.message });
    }
}

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await AdminModel.findOne({ email });
        if (!admin) return res.status(404).json({ type: "error", message: "Admin not found" });

        const isPasswordCorrect = await bcrypt.compare(password, admin.password);
        if (!isPasswordCorrect) return res.status(400).json({ type: "error", message: "Invalid credentials" });

        const token = jwt.sign({ email: admin.email, id: admin._id }, process.env.JWT_SECRET || 'secret', { expiresIn: "1h" });
        res.status(200).json({ type: "success", result: admin, token });
    } catch (error) {
        res.status(500).json({ type: "error", message: error.message });
    }
}

const userSignup = async (req, res) => {
    try {
        const { name, email, number, address, city, password } = req.body;
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) return res.status(400).json({ type: "error", message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new UserModel({ name, email, number, address, city, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ type: "success", message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ type: "error", message: error.message });
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(404).json({ type: "error", message: "User not found" });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ type: "error", message: "Invalid credentials" });

        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: "1h" });
        res.status(200).json({ type: "success", result: user, token });
    } catch (error) {
        res.status(500).json({ type: "error", message: error.message });
    }
}

export { userLogin, userSignup, adminLogin, adminSignUp }