'use strict'

import User from './user.model.js'
import Course from '../curses/curse.model.js'

import { encrypt, checkPassword } from '../utils/validator.js'


export const test = (req, res) =>{
    console.log('test is running')
    return res.send({message: 'Test is running'})
}

export const registUser = async(req, res)=>{
    try{
        //capturamos la info
        let data = req.body     
        //Encriptar la contraseña
        data.password = await encrypt(data.password)   
        //Guardar en la bd
        let user = new User(data)
        await user.save()
        //mensaje de que se guardo exitosamente
        return res.send({message: `Register successfully, can be logged with email use ${user.username}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registering a user'})
    }
}

export const userDefect = async(req, res) =>{
    try{
        const userExists = await User.findOne({username: 'admin'})
        if(userExists){
            console.log('Se creo usuario')
        }else{
            const encryptPassword = await encrypt('Guatemala')
            const newUser = new User({
                name: 'admin',
                lastname: 'general',
                username: 'admin',
                password: encryptPassword,
                role: 'TEACHER'

            })
            await newUser.save()
        }
    }catch(err){
        console.error(err)
    }
}


export const deleteCourseById = async (req, res) => {
    try{
        const courseId = req.params.courseId;
        // Busca el curso en la base de datos por ID
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).send({message: 'curse not found'})
        //Eliminamos
        await course.remove();
        //mensaje
        return res.send({ message: 'Course deleted successfully' });
    }catch(err){
        console.error(err);
        return res.status(500).send({ message: 'Error deleting course'});
    }
}


export const loginUser = async(req, res)=>{
    try{
        //capturar la info del profesor (por username y password)
        let {username, password} = req.body
        //Validar que si existe
        let user = await User.findOne({username})
        //Verificar que coincida la contraseña
        if(user && await checkPassword(password, user.password)){
            let loggedUser = {
                username: user.username,
                name: user.name,
                role: user.role
            }
            return res.send({message: `Welcome ${loggedUser.name}`, loggedUser})
        }
        return res.status(404).send({message: 'Invalid credentials'})        
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error to log in your account'})
    }
}