import { Request, Response } from "express";
import { get } from "http";
import { resolve } from "path";
import Cart from "../models/cart";
import Product from "../models/product"


export const cartController = {

    add: async (req: Request, res: Response) => {

        const newCart = new Cart({ ...req.body })
        await newCart.save()
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

        await cartController.updateTotal();

        Cart.findOne({ _id: req.params.idCart })
            .populate('details.product')
            .then(async (cart) => {
                res.send(cart);
            }).catch((err) => {
                res.status(500).send(err)
            })
    },

    getAll: async (req: Request, res: Response) => {

        Cart.find({}).populate('details.product').then(async (cart) => {
            res.send(cart)
        }).catch((err) => {
            res.status(500).send(err)
        })
    },

    addProduct: async (req: Request, res: Response) => {
        Cart.findById(req.body.cartId)
            .populate('details.product')
            .then(async (cart) => {
                if (!cart) {
                    return res.status(404).send()
                } else {
                    var productObj = await Product.findById(req.body.productId);

                    if (productObj != null) {

                        var existantProduct = cart.details.find(x => x.product?._id == req.body.productId);

                        if (existantProduct === undefined) {
                            const newProduct = {
                                "product": req.body.productId,
                                "quantity": 1
                            }
                            cart.details.push(newProduct);
                        } else {
                            existantProduct.quantity++;
                        }
                        await cart.save();

                        productObj.stock--;

                        await productObj.save();

                        await cartController.updateTotal();

                        res.send(cart);

                    } else {
                        return res.status(404).send()
                    }

                }

            }).catch((err) => {
                res.status(500).send(err)
            })
    },

    // elimino el producto del carrito
    deleteProduct: async (req: Request, res: Response) => {
        Cart.findById(req.body.cartId)
            .populate('details.product')
            .then(async (cart) => {
                if (!cart) {
                    return res.status(404).send()
                } else {

                    var existantProduct = cart.details.find(x => x.product?._id == req.body.productId);

                    if (existantProduct === undefined) {
                        return res.status(404).send()
                    } else {
                        if (existantProduct.quantity == 1) {
                            var indice = cart.details.indexOf(existantProduct);
                            cart.details.splice(indice, 1);
                        } else {
                            existantProduct.quantity--;
                        }
                        await cart.save();

                        var productObj = await Product.findById(req.body.productId);
                        if (productObj != undefined) {
                            productObj.stock++;
                            await productObj?.save();
                        }
                    }

                    await cartController.updateTotal();

                    res.send(cart);
                }

            }).catch((err) => {
                res.status(500).send(err)
            })
    },

    async updateTotal() {
        Cart.find({}).populate('details.product').then(async (carts) => {
            carts.forEach(async cart => {
              
                let total = 0;
                cart.details.forEach(detail => {
                   
                    // @ts-ignore: Object is possibly 'null'.
                    total = total + detail.product?.price * detail.quantity;
                });
                cart.total = total;
                await cart.save();
            })
        })
    }

};