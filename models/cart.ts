import mongoose, { Schema, model } from "mongoose";

const cartSchema = new Schema({
    details: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: {type: Number, default: 0} 
        }
    ],
});

const Cart = model("Cart", cartSchema);
export default Cart;
