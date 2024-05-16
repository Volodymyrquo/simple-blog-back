import { body } from "express-validator";

export const registerValidation = [
    body('email','Not valid email type').isEmail(),
    body('password',"Password should be more than 5 characters").isLength({min:5}),
    body('fullName','Name should be at least 3 characters').isLength({min: 3}),
    body('avatarUrl',"Not valid link").optional().isURL(),
]
export const loginValidation = [
    body('email','Not valid email type').isEmail(),
    body('password',"Password should be more than 5 characters").isLength({min:5}),
]
export const postCreateValidation = [
    body('title','Add post title').isLength({min:3}).isString(),
    body('text',"Add post description").isLength({min:3}).isString(),
    body('tags','Tags should be string').optional().isString(),
    body('imageUrl',"Not valid link").optional().isString(),
]
