import { Router } from "express";
import blogRoutes from "./blogs";
import userRoutes from "./users";
import newsRoutes from "./news";
import cartsRoutes from "./carts";
import productsRoutes from "./products";

const router = Router();
router.use("/blogs", blogRoutes);
router.use("/users", userRoutes);
router.use("/news", newsRoutes);
router.use("/carts", cartsRoutes);
router.use("/products", productsRoutes);


export default router;
