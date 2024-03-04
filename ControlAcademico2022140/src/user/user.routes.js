import express from 'express'
import { registUser, login, updateUser, deleteU } from './user.controller.js'
import { 
    validateJwt, isTeacher
} from '../middlewares/validate-jwt.js';



const api = express.Router()

api.post('/registUser', registUser)
api.post('/login', login)

api.put('/updateUser/:id', [validateJwt, isTeacher], updateUser)

api.delete('/deleteU/:id', [validateJwt, isTeacher], deleteU)


export default api