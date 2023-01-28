//En routes lo que se hace es crear diferentes rutas ya sea de tipo get, post, del, put, etc... donde se les asignan preferentemente los controllers para obtener mucho mayor orden
import { Router } from "express";
import {
  getPosts,
  deletePost,
  getPost,
  updatePost,
  createPost
} from "../controllers/post.controllers.js";

const router = Router();

router.get ("/posts", getPosts)

router.post("/posts", createPost);

router.put("/posts/:id", updatePost);

router.delete("/posts/:id", deletePost);

router.get("/posts/:id", getPost);

export default router;
