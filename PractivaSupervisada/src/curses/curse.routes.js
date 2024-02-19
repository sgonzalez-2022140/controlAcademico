'use strict'

import { Router } from 'express'

import { 
    addCurse, search 
} from './curse.controller.js'

import { validateJwt, isAdmin } from '../middlewares/valide-jwt.js'


const api = Router()

//Rutas publicas
api.post('/addCurse', addCurse)


api.post('/search', search)

export default api