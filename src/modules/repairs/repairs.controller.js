import { catchAsync } from "../../common/errors/catchAsync.js";
import { validatePartialRepair, validateRepair } from "./repairs.schema.js";
import { RepairsService } from "./repairs.services.js";
//funcion para el metodo get y obtener todas los repairs

export const findAll = catchAsync(async (req, res, next) => {
  const repairs = await RepairsService.findAll();
  return res.status(201).json(repairs);
});

//funcion para el metodo post y poder crear un repairs

export const create = catchAsync(async (req, res) => {
  const { hasError, errorMessages, repairData } = validateRepair(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessages,
    });
  }

  const repairs = await RepairsService.create(repairData);

  return res.status(201).json({
    date: repairs.date,
    motorsNumber: repairs.motorsNumber,
    description: repairs.description,
  });
});

//funcion para el metodo get y obtener un repair
export const findOne = catchAsync(async (req, res) => {
  const { repair } = req;

  return res.status(200).json(repair);
});

//funcion para el metodo put y actualizar un repair
export const updateOne = catchAsync(async (req, res) => {
  const { repair } = req;

  const { hasError, errorMessages, repairData } = validatePartialRepair(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessages,
    });
  }

  const repairUpdate = await RepairsService.update(repair, repairData);
  return res.status(200).json(repairUpdate);
});

//funcion para el metodo delete y elemininar un repair
export const deleteOne = catchAsync(async (req, res) => {
  const { repair } = req;

  await RepairsService.delete(repair);
  
  return res.status(204).json(null);
});
