import pkg from 'mongoose'
const{Schema , model}=pkg

const TISchema = Schema({

    model: {
        type: String,
        require: [true, 'model is requiere']
    },
    cost: {
        type: String
    },
    description: {
        type: String,
        requiere: [true , 'modelo is requiere']
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

TISchema.methods.toJSON=function(){
    const { __v,password, _id, ...TI } = this.toObject()
    TI.uid = _id
    return TI
}

export default model('TI',TISchema)