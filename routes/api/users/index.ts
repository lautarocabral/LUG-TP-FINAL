import { Router } from "express";
import mongoose from "mongoose";
import User from "../../../models/users";


const router = Router();
router.get("/", (req, res) => {
  res.send("ok");
});

//Get all users
router.get('/all', (req, res) => {
  User.find({}).then((users) => {
    res.send(users);
  }).catch((error) => {
    res.status(500).send(error);
  })
});

//Post user
router.post('/add', (req, res) => {
  User.create(req.body).then((user) => {
    res.status(201).send(user);
  }).catch((error) => {
    res.status(400).send(error);
  })
})
export default router;
