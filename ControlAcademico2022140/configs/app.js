'use strict'

import express from 'express'
import { config } from "dotenv"

//importar las rutas de las entidades
import UserRoutes from "../src/user/user.routes.js"
import CoursesRoutes from "../src/courses/courses.routes.js"
import AssignCourses from "../src/assignment/assign.routes.js"


//express confs 
const app = express();
config();
const port = process.env.PORT || 3056




app.use(express.urlencoded({extended: false}))
app.use(express.json())


//iniciar métodos 
app.use(UserRoutes)
app.use(CoursesRoutes)
app.use(AssignCourses)


//iniciar servidor
export const initServer = ()=>{
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}