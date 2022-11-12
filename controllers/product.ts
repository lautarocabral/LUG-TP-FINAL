import { Request, Response } from "express";
import Product from "../models/product"


export const productController = {

    // add producto
    add: async (req: Request, res: Response) => {
        try {
            const newProd = new Product({ ...req.body })
            var prod = await newProd.save();
            res.send(prod);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    // delete producto
    delete: async (req: Request, res: Response) => {

        try {
            // Al hacer un find({}) pasandole un objeto vacio,trae toda la lista de carts
            var product = await Product.findOneAndDelete({ _id: req.body.productId });
            res.send(product);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    // getAll productos
    getAll: async (req: Request, res: Response) => {
        try {
            // cuando hago un find con el obj vacio({}) me trae una lista con todos los productos
            var prod = await Product.find({});
            res.send(prod);
        } catch (error) {
            res.status(500).send(error)
        }

    },

};