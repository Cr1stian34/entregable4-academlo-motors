import express from "express";

//controller
import {
  create,
  deleteOne,
  findAll,
  findOne,
  login,
  updateOne,
} from "./users.controller.js";
import {
  protect,
  protectAccountOwner,
  validateExistUser,
} from "./users.middleware.js";

export const router = express.Router();

//******************** Definir los endpoint a ser utlizados **************/
//metodo get para traer todos los usuarios

//metodo get para agregar un usuario
router.post("/", create);
router.post("/login", login);

router.use(protect);
router.get("/", findAll);

router
  .route("/:id")
  .get(validateExistUser, findOne)
  .patch(validateExistUser, protectAccountOwner, updateOne)
  .delete(validateExistUser, protectAccountOwner, deleteOne);
