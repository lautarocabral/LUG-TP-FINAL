import { Router } from "express";
import mongoose from "mongoose";
import Blog from "../../../models/blogs";


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

router.post('/add', (req, res) => {
  Blog.create(req.body).then((blogs) => {
      res.status(201).send(blogs);
  }).catch((error) => {
      res.status(400).send(error);
  })
})
// se exporta el router para poder enlazarlo con las rutas que estan dentro de /api.
export default router;
