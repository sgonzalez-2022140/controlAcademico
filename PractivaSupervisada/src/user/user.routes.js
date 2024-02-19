import express from 'express'
//falta el token

//Métodos
import { test, registUser, deleteCourseById, loginUser} from './user.controller.js'

const api = express.Router();

//Rutas publicas
api.get('/test', test)
api.post('/registUser', registUser)
api.delete('/deleteCourseById', deleteCourseById)
api.post('/loginUser', loginUser)

export default api