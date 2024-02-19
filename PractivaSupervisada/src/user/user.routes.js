import express from 'express'
//falta el token

//Métodos
import {
    validateJwt,
    isAdmin
} from '../middlewares/valide-jwt.js'

import { test, registUser, loginUser, deleteU, updateUser} from './user.controller.js'

const api = express.Router();

//Rutas publicas
api.get('/test', test)
api.post('/registUser', registUser)
api.delete('/deleteU', deleteU)
api.post('/loginUser', loginUser)
api.put('/updateUser', updateUser)


api.get('/test', [validateJwt, isAdmin])
api.put('/update/:id', [validateJwt])


export default api