import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
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
        require: true
    }
},{
    versionKey: false
}
)

export default mongoose.model('user', userSchema)