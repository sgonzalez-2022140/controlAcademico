'use strict'

import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,        
        lowercase: true,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minLength: [8, 'Password must be 8 characters'],
        required: true
    },    
    role: {
        type: String,
        uppercase: true,
        enum: ['TEACHER', 'STUDENT'],
        required: true
    }
}, {
    versionKey: false //Desahabilitar el __v (version del documento)
})

export default mongoose.model('user', userSchema)