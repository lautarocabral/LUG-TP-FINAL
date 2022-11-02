import mongoose, { Schema, model } from "mongoose";

const cartSchema = new Schema({
    details: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: Number
        }
    ],
});

const Cart = model("Cart", cartSchema);
export default Cart;
