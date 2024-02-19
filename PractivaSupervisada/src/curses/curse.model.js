import mongoose, { Schema } from "mongoose";

const curseSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    user: {
        type: Schema.ObjectId,
        require: true,
        ref: 'user'
    }
},{
    versionKey: false
}

)

export default mongoose.model('curse', curseSchema)