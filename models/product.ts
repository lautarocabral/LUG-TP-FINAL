import { Schema, model } from "mongoose";

const productSchema = new Schema({
    productName: String, 
    stock: Number,
    price: Number
});

const Product = model("Product", productSchema);
export default Product;
