import pkg from 'mongoose'
const{Schema , model}=pkg

const inforScheme=Schema({

    modelo:{
        type: String,
        require:[true, 'modelo is requiere']
    },
    costo:{
        type:String
    },

    descripcion:{
        type: String,
    requiere:[true , 'modelo is requiere']
    },
    seriado:{
        type:String,
        unique:true
    },
    nombreResponsable:{
        type: String,
        requiere:[true , 'nombreResponsable is requiere']
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

inforScheme.methods.toJSON=function(){
    const {__v,password,_id, ...infor}=this.toObject()
    infor.uid=_id
    return infor
}

export default model('informatica',inforScheme)