import { Schema, model } from "mongoose";

// declaro la estructura que va a tener mi esquema/documento/tabla.
const cartSchema = new Schema({
    details: [{ body: String, date: Date }],
});

const Cart = model("Cart", cartSchema);
// exporto mi modelo, el cual me permite acceder a los metodos de la bd.
export default Cart;
