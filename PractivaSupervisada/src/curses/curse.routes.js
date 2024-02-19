'use strict'

import { Router } from 'express'

import { 
    addCurse 
} from './curse.controller.js'

const api = Router()

//Rutas publicas
api.post('/addCurse', addCurse)

export default api