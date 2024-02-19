'use strict'

import User from '../user/user.model.js'
import Curse from './curse.model.js'
import { checkUpdate } from '../utils/validator.js'

export const addCurse = async (req, res) => {
    try {
        let data = req.body                        
        //crear instnacia de curse
        let curse = new Curse(data)
        //guardar en la bd
        await curse.save()
        //Responder si todo esta bien
        return res.send({message: `You create a new curse called: ${curse.name}`})

    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error adding a curse'})
    }
}

export const search = async (req, res) => {
    try {
        let curses = await Curse.find()
        return res.send({ curses })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error getting animals' })
    }
}
