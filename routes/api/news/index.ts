import { Router } from "express";
import mongoose from "mongoose";
import News from "../../../models/news";
import User from "../../../models/users";

const router = Router();
router.get("/", (req, res) => {
  res.send("ok");
});


router.get('/all', (req, res) => {
  News.find({})
    .populate({ path: 'userIdNews', model: User })
    .populate({ path: 'comments.userIdComment' })
    .then((news) => {
      if (!news) {
        return res.status(404).send();
      }

      res.send(news);
    }).catch((error) => {
      res.status(500).send(error);
    })
});

router.post('/add', (req, res) => {
  News.create(req.body).then((blogs) => {
    res.status(201).send(blogs);
  }).catch((error) => {
    res.status(400).send(error);
  })
});

router.delete('/delete/:id', (req, res) => {
  console.log(req.params.id + 'el id en cuestion');
  
  News.findByIdAndDelete(req.params.id).then((news) => {
    if (!news) {
      return res.status(404).send();
    }
    res.send(news);
  }).catch((error) => {
    res.status(500).send(error);
  })
});

export default router;

