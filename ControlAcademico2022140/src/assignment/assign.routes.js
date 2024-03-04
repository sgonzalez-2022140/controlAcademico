'use strict'

import { Router } from 'express'

import {
    assignCourse
} from './assign.controller.js'

import { isTeacher, validateJwt } from '../middlewares/validate-jwt.js'

const api = Router()

api.post('/assignCourse', [validateJwt, isTeacher], assignCourse)



export default api