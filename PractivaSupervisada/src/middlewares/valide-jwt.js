'use strict'

import jwt from 'jsonwebtoken'
import User from '../user/user.model.js'

export const validateJwt = async(req, res, next)=>{
    try{
        //Obtener la llave de acceso al token
        let secretKey = process.env.SECRET_KEY
        //obtener el token de los headers
        let { token } = req.headers
        //Verificar si viene el token
        if(!token) return res.status(401).send({message: 'Unauthorized'})
        //Obtener el uid del usuario que envió el token
        let { uid } = jwt.verify(token, secretKey)
        //Validar si aún existe en la BD
        let user = await User.findOne({_id: uid})
        if(!user) return res.status(404).send({message: 'User not found - Unauthorized'})
        req.user = user
        next()
    }catch(err){
        console.error(err)
        return res.status(401).send({message: 'Invalid token'})
    }
}

export const isAdmin = async(req, res, next)=>{
    try{
        let { user } = req
        if(!user || user.role !== 'TEACHER') return res.status(403).send({message: `You dont have access | username: ${user.username}`})
        next()
    }catch(err){
        console.error(err)
        return res.status(403).send({message: 'Unauthorized role'})
    }
}