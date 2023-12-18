import { AppError } from "../../common/errors/appError.js";
import { catchAsync } from "../../common/errors/catchAsync.js";
import { verifyPassword } from "../../config/plugins/encripted-password.plugin.js";
import { generateJWT } from "../../config/plugins/generate-jwt.plugin.js";
import { validateLogin, validatePartialUser, validateUser } from "./users.schema.js";
import { UsersService } from "./users.services.js";
// controladores es decir funciones para cada metodo http

//funcion para hacer el login

export const login = catchAsync(async(req, res, next)=>{
  const {hasError, errorMessages, userData} = validateLogin(req.body)

  if(hasError){
    return res.status(422).json({
      status: "error",
      message: errorMessages
    })
  }

  const user = await UsersService.findOneByEmail(userData.email)

  if(!user){
    return next(new AppError("This account does not exist",404))
  }

  const isCorrectPassword = await verifyPassword(userData.password, user.password)

  if(!isCorrectPassword){
    return next(new AppError("Icorrect email or password", 401))
  }

  const token = await generateJWT(user.id)

  return res.status(200).json({
    token: token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    },
  }) 
})

//Funcion para el metodo get para obtener todas las enfermedades
export const findAll = catchAsync(async (req, res, next) => {
  const users = await UsersService.findAll();

  return res.status(201).json(users);
});

//Funcion para el metodo post para poder crear un usuario

export const create = catchAsync(async (req, res) => {
  const { hasError, errorMessages, userData } = validateUser(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const user = await UsersService.create(userData);

  return res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
    role: user.role,
  });
});

//Fucion para la ruta get y poder obtener un solo usuario

export const findOne = catchAsync(async (req, res,next) => {
  const { user } = req

  return res.status(200).json(user);
});

//Funcion para la ruta put y poder actualizar un usuario

export const updateOne = catchAsync(async (req, res,next) => {
  const { user } = req
  
  const { hasError, errorMessages, userData } = validatePartialUser(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const userUpdate = await UsersService.update(user, userData);
  return res.status(200).json(userUpdate);

});

//Funcion para la ruta delete y poder eleminar un usuario

export const deleteOne = catchAsync(async (req, res) => {
  const { user } = req;
  
  await UsersService.delete(user);

  return res.status(204).json(null);

});
