import { CallTracker } from "assert";
import e, { Router } from "express";
import mongoose from "mongoose";
import Blog from "../../../models/blogs";
import Product from "../../../models/product";
import Cart from "../../../models/cart";


const router = Router();
router.get("/", (req, res) => {
    res.send("ok");
});

router.get('/all', (req, res) => {
    console.log('entra en el metodo por lo menos');
    Blog.find({}).then((blogs) => {
        res.send(blogs);
    }).catch((error) => {
        res.status(500).send(error);
    })
});

router.post('/add/:id', async (req, res) => {
    var cartToUse;
    var productId = req.params.id;
    var _cart = await Cart.find({});

    if (_cart.length == 0) {
        // CREO CART
        console.log("CREO CART");

        Cart.create({ details: [] }).then(async (cart) => {
            // var t = JSON.stringify(cart);
            // console.log(t);

            var producto = await Product.findById(productId);

            cart.details.push({ quantity: 1, product: producto?.id });

            var acum = 0;
            // for (let index = 0; index < cart.details.length; index++) {
            //     const element = cart.details[index];
            //     // element.product?._id;
            //     var prodPrecio = await Product.findById(element.product?._id).then(
            //         (preeecio) => {
            //             var precio = preeecio?.price;
            //             var cantidad = element.quantity;
            //             var subtotal = precio * cantidad;
            //         }
            //     );

            // }

            cart.save();

        });

    } else {
        //USO EXISTENTE
        console.log("USO EXISTENTE");

        cartToUse = _cart[0];
    }

    // var productId = req.params.id;
    // console.log(productId);

    // Product.findById(productId).then((product) => {

    //     var b = JSON.stringify(product);

    //     console.log(b);
    //     res.status(201).send(product);

    // }).catch((error) => {
    //     res.status(400).send(error);
    // })



    // Blog.create(req.body).then((blogs) => {
    //     res.status(201).send(blogs);
    // }).catch((error) => {
    //     res.status(400).send(error);
    // })
})
// se exporta el router para poder enlazarlo con las rutas que estan dentro de /api.
export default router;
