'use strict'

import mongoose, { Schema, model } from 'mongoose'

const coursesSchema  = Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: Schema.ObjectId,
        required: true,
        ref: 'user'
    }

}, {
    versionKey: false 
})

export default model('course', coursesSchema )