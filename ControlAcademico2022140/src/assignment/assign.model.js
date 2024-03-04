'use strict'

import { Schema, model } from 'mongoose'

const companySchema = Schema({
    course: {
        type: Schema.ObjectId,
        required: true,
        ref: 'course'
    },
    student: {
        type: Schema.ObjectId,
        required: true,
        ref: 'user'
    }
},
{
    versionKey: false
})

export default model('assign', companySchema)