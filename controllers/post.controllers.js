//Un controller es un filtro en donde creamos una función para dictar por todos lo que pasará la petición para al final mandar un res
import PostModel from "../model/POST.js";
import { uploadImage, deleteImage } from "../libs/cloudinary.js";
import fs from "fs-extra";

export const getPosts = async (req, res) => {
  const allPosts = await PostModel.find();
  res.send(allPosts);
};

export const updatePost = async (req, res) => {
  const postUpdated = await PostModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  //El último parametro permite que se actualice correctamente ya que de lo contrario al hacer el clg mostraría el estado anterior del post

  console.log(postUpdated);
  res.send("Post updated");
};

export const deletePost = async (req, res) => {
  try {
    const postRemoved = await PostModel.findByIdAndDelete(req.params.id);
    if (!postRemoved) {
      res.send("Post not found");
    } else {
      if (postRemoved.image.public_id) {
        await deleteImage(postRemoved.image.public_id);
      }
      res.send("Post deleted");
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const post = await PostModel.findById(req.params.id);
  if (!post) {
    res.send("Post no found");
  } else {
    return res.json(post);
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    let image = null;
    // console.log(req.files.image)
    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
      //La sig. línea elimina el archivo temporal de la carpeta upload una vez se haya subido
      await fs.remove(req.files.image.tempFilePath);
    }
    const post = new PostModel({ title, description, image });
    await post.save();
    return res.json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
