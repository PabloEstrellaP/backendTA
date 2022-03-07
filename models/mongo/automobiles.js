import pkg from 'mongoose'
const {Schema , model}=pkg

const AutomobileSchema = Schema({
    description: {
        type: String,
        require: [true, 'description is requiere']
    },
    model: {
        type: String,
        require: [true, 'model is requiere']
    },
    motorSerial: {
        type : String,
        unique : true,
        require: [ true, 'motoroSerial is require']
    },
    plaque: {
        type:String,
        unique : true
    },
    originalDate: {
        type : Date
    },
    serial: {
        type : String,
        unique: true,
        require: [true, 'serial is require']
    },
    responsableName : {
        type: String,
        require : [true,'responsableName is requiere']
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

AutomobileSchema.methods.toJSON=function () {
    const{ __v ,password,id, ...automobile} = this.toObject()
    automobile.uid=__di
    return automobile
}

export default model('Automobile',AutomobileSchema)