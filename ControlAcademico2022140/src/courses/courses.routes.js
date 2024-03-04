import express from 'express'
import { addCourse, updateCourse, deleteCourse, search  } from './courses.controller.js'

import { validateJwt, isTeacher } from '../middlewares/validate-jwt.js'

const api = express.Router()

api.post('/addCourse', [validateJwt, isTeacher], addCourse)

api.put('/updateCourse/:id', [validateJwt, isTeacher ], updateCourse)

api.delete('/deleteCourse/:id', [validateJwt, isTeacher], deleteCourse)

api.post('/search', [validateJwt, isTeacher], search)

export default api