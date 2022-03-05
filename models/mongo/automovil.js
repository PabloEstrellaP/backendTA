import pkg from 'mongoose'
const {Schema , model}=pkg

const AutoScheme = Schema({
    description:{
        type: String,
        require: [true, 'Description is requiere']
    },
    modelo:{
        type: String,
        require: [true, 'Modelo is requiere']
    },
    serieMotor:{
        type:String,
        unique:true
    },
    placas:{
        type:String,
        unique:true
    },
    originalDare:{
        type:Date,
    },
    seriado:{
        type:String,
        unique: true
    },
    nombreResponsable:{
        type: String,
        require:[true,'nombreResponsable is requiere']
    },
    creationDate: {
        type: Date,
        require: [ true, 'creationDate is require']
      },
      updateDate: {
        type: Date,
      },
      isDelete: {
        type: Boolean,
        default: false,
      }
    })

AutoScheme.methods.toJSON=function () {
    const{__v ,password,id, ...auto}=this.toObject()
    auto.uid=__di
    return auto
    
}
export default model('auto',AutoScheme)