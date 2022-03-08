import pkg from 'mongoose'
const{Schema , model}=pkg

const ITSchema = Schema({

    model: {
        type: String,
        require: [true, 'model is requiere']
    },
    cost: {
        type: String
    },
    description: {
        type: String,
        requiere: [true , 'description is requiere']
    },
    serial: {
        type: String,
        unique: true,
        require: [true, "serial is require"]
    },
    responsableName: {
        type: String,
        requiere: [true , 'responsableName is requiere']
    },
    creationDate: {
        type: Date,
    },
    updateDate: {
        type: Date,
    },
    isDelete: {
        type: Boolean,
        default: false
    }
})

export default model('IT',ITSchema)