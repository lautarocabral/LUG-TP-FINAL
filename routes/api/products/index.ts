import { Router } from "express";
import mongoose from "mongoose";
import Product from "../../../models/product";
import User from "../../../models/users";


const router = Router();
router.get("/", (req, res) => {
  res.send("ok");
});

//Get all products
router.get('/all', (req, res) => {
  Product.find({}).then((product) => {
    res.send(product);
  }).catch((error) => {
    res.status(400).send(error);
  })
});

//Post product
router.post('/add', (req, res) => {
  Product.create(req.body).then((product) => {
    res.status(201).send(product);
  }).catch((error) => {
    res.status(400).send(error);
  })
})
export default router;
