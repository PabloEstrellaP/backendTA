import pkg from 'mongoose'
const {Schema,model}=pkg

const HousingSectorSchema = Schema({

    serial: {
        type: String,
        unique: true,
        require: [true, 'serial is required']
    },
    description: {
        type: String,
        require: [true , 'description is requiere']
    },
    origenalDate: {
        type: Date,
    },
    cost: {
        type: Number,
    },
    responsableName: {
        type: String,
        require: [true, 'responsableName is requiere']
    },
    creationDate: {
        type:Date
    },
    updateDate: {
        type: Date,
    },
    isDelete: {
        type: Boolean,
        default: false,
    }
})

export default model('HousingSector', HousingSectorSchema)