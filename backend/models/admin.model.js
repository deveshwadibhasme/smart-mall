import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    nameOfVendor: { type: String, required: true },
    nameOfStore: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    Number: { type: Number, required: true },
    city: { type: String, required: true }
})

const AdminModel = mongoose.model("admin", AdminSchema)
export default AdminModel