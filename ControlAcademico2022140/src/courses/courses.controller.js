'use strict'

import User from '../user/user.model.js'
import Course from '../courses/courses.model.js'

import { checkUpdate } from '../utils/validator.js'

export const addCourse = async(req, res)=>{
    try{
        let data = req.body
        //guardat en variable
        let course = new Course(data)
        await course.save()
        //mensaje para decir que se guardo
        return res.send({message: `We add this company: ${course.name}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error to add company'})
    }
}

export const updateCourse = async(req, res) =>{
    try {
        //Jalar el id
        let { id } = req.params
        //traer la info del server
        let data = req.body
        //validar la info
        let update = checkUpdate(data, false)
        if(!update) return res.status(400).send({message: 'You can´t edit this data'})
        let updatedCourse = await Course.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )
        if(!updatedCourse) return res.status(404).send({message: 'Company not found and not update'})
        return res.send({message: 'Company updated successfully', updatedCourse})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error updating company'})
    }
}

export const search = async(req, res) => {
    try{
        //Obtener el parámetro de búsqueda
        let { search } = req.body
        //Bsucar
        let courses = await Course.find(
            {teacher: search}
        )
 
        //validar la respuesta
        if(!courses) return res.status(404).send({message: 'Courses not found '})
        //responder si todo sale bien
        return res.send({message: 'Courses found', courses})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error searching Courses'})
    }
}

export const deleteCourse = async(req, res) =>{
    try{
        let { id } = req.params
        //Eliminar
        let deleteCourse = await Course.deleteOne({_id: id})
        //validación
        if(deleteCourse.deleteCount === 0 ) return res.status(404).send({message: 'Course not found and not deleted'})
        //Respondemos al usuario
        return res.send({message: 'Deleted course successfully'})
    }catch(err){
        console.error(err)
        return res.status(404).send({message: 'Error deleting course'})
    }
}