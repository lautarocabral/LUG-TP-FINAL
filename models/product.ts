import { Schema, model } from "mongoose";

const productSchema = new Schema({
    productName: String,
    stock: { type: Number, default: 0 },
    price: Number
});

const Product = model("Product", productSchema);
export default Product;
