import express from "express";
import {
  create,
  deleteOne,
  findAll,
  findOne,
  updateOne,
} from "./repairs.controller.js";
import { validatePendingRepair } from "./repairs.middleware.js";
import { protect, restrictTo } from "../users/users.middleware.js";

export const router = express.Router();

/*********************Definir los endpoints para ser utilizados */
//metodo get para traer todos los repairs

//metodo post para crear los repairs
router.post("/", create);

router.use(protect);
router.get("/", restrictTo("empleado"), findAll);

router
  .route("/:id")
  .get(restrictTo("empleado"), validatePendingRepair, findOne)
  .patch(restrictTo("empleado"), validatePendingRepair, updateOne)
  .delete(restrictTo("empleado"), validatePendingRepair, deleteOne);
