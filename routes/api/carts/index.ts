import { Router } from "express";
import { cartController } from '../../../controllers/cart';

const router = Router();

router.post("/add", cartController.add);

router.get("/get", cartController.get);

router.get("/getAll", cartController.getAll);

router.post("/addProduct", cartController.addProduct);



export default router;