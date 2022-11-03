import { Request, Response } from "express";
import Cart from "../models/cart";
import Product from "../models/product"


export const cartController = {

    add: async (req: Request, res: Response) => {

        const newCart = new Cart({ ...req.body })
        newCart.save()
            .then((cart) => {
                if (!cart) {
                    return res.status(404).send()
                }
                res.send(cart)
            }).catch((err) => {
                res.status(500).send(err)
            })
    },

    get: async (req: Request, res: Response) => {

        Cart.find({ _id: req.body.idCart })
            .populate('products.product')
            .then((cart) => {
                if (!cart) {
                    return res.status(404).send()
                }
                res.send(cart)
            }).catch((err) => {
                res.status(500).send(err)
            })
    },

    getAll: async (req: Request, res: Response) => {
        console.log('acasc');
        Cart.find({})
            .populate('products.product')
            .then((cart) => {
                if (!cart) {
                    return res.status(404).send()
                }
                res.send(cart)
            }).catch((err) => {
                res.status(500).send(err)
            })
    },

    addProduct: async (req: Request, res: Response) => {
        console.log("exito");
        Cart.findById(req.body.idCart)
            // .populate('details.productId')
            .then(async (product) => {
                
                
                if (!product) {
                    return res.status(404).send()
                } else {
                    
                    var productObj = await Product.findById(req.body.productId);

                    // modifico stock
                    if (productObj != null) {
                        productObj.stock = productObj.stock - 1;
                        productObj.save();
                    }
                    cartController.getAll(req, res);
                    // const newProduct = {
                    //     "product": req.body.productId,
                    //     "quantity": 0
                    // }




                    // productId.save()
                    // res.send(productId)
                }

            }).catch((err) => {
                res.status(500).send(err)
            })
    },



};