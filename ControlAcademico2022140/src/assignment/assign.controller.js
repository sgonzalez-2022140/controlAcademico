'use strict'

import Assignment from './assign.model.js'
import Course from '../courses/courses.model.js'
import User from '../user/user.model.js'



export const assignCourse = async(req, res)=>{
    try{
        //capturar la informacion de la BD
        let data = req.body;
        //Verificar que exista el curso
        let course = await Course.findOne({_id: data.course})
        if(!course) return res.status(404).send({message: 'No courses yet'})
        //verificar los usuarios
        let student = await User.findOne({_id: data.student})
        if(!student) return res.status(404).send({message: 'No users yet'})

        //extras
        let userID = data.student;
        const courseCount = await Assignment.countDocuments({ students: userID })
        if (courseCount >= 3) {
            return res.status(400).send({message: `The studento with ${userID} is alredy exists in 3 courses.`});
        }
         const existingCourse = await Assignment.findOne({ students: userID, name: data.name });
        if (existingCourse) {
            return res.status(400).send({message: `The student with ${studentId} already exists in: ${data.name}.`});
        }
        //Guardar la respuesta hacia ese comentario
        let assign = new Assignment(data)
        await assign.save()
        return res.send({message: `The course is register successfully`})
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error in the reply', err})
    }
}