'use strict'

import User from './user.model.js'
import Course from '../curses/curse.model.js'

import { encrypt, checkPassword, checkUpdate } from '../utils/validator.js'
import { generateJwt } from '../utils/jwt.js'



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

export const updateUser = async(req, res)=>{
    try {
        let { id } = req.params
        let data = req.body
        let update = checkUpdate(data, id)
        if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be update'})
        let updatedUser = await User.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )
        if(!updatedUser) return res.status(401).send({message: 'User not found and not update'})
        return res.send({message: 'Update user', updatedUser})
    } catch (err) {
        console.error(err)
        if(err.keyValue.username)return res.status(400).send({message: `Username ${err.keyValue.username} is alredy exists`})
        return res.status(500).send({message: `Error updating account`})
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
            //Generar el token 
            let token = await generateJwt(loggedUser)

            return res.send({message: `Welcome ${loggedUser.name}`,  loggedUser, token})
        }
        return res.status(404).send({message: 'Invalid credentials'})        
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error to log in your account'})
    }
}

export const deleteU = async(req, res)=>{
    try{
        //Obtener el Id
        let { id } = req.params
        //Validar si está logeado y es el mismo X No lo vemos hoy X
        //Eliminar (deleteOne (solo elimina no devuelve el documento) / findOneAndDelete (Me devuelve el documento eliminado))
        let deletedUser = await User.findOneAndDelete({_id: id}) 
        //Verificar que se eliminó
        if(!deletedUser) return res.status(404).send({message: 'Account not found and not deleted'})
        //Responder
        return res.send({message: `Account with username ${deletedUser.username} deleted successfully`}) //status 200
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting account'})
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