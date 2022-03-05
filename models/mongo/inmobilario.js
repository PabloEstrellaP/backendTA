import pkg from 'mongoose'
const {Schema,model}=pkg

const inmoScheme=Schema({

    seriado:{
        type:String,
       unique:true
        

    },
    description:{
        type: String,
        require:[true , 'description is requiere']
    },
    origenalDate:{
        type:Date,
    },
    costo:{
        type:String,
        
    },
    NombreResponsable:{
        type :String,
        require:[true, 'NombreResponsable is requiere']
    },
    creationDate:{
        type:Date,
        require:[true, 'creationDate is requiere']
    },
    updateDate:{
        type: Date,
    },
    isDelete: {
        type: Boolean,
        default: false,
    }

})

export default model('inmobilario',inmoScheme)