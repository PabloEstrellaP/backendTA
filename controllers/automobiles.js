import { response } from "express";
import req from "express/lib/request";
import res from "express/lib/response";
import automobiles from "../models/mongo/automobiles";




export const getautomobile = async (req ,res=response) =>{

    try{
        const auto=await automobiles.find({ isDelete: false}) 
        return res.status(200).json({
            ok:true,
            msg: auto
        })
    }catch(error){
        return res.status(400).json({
            ok:true,
            msg:error
        })
    }

}
export const getautomobileById = async (req,res=response)=>{
    try{
        const {id}=req.params
        const auto=await automobiles.findById(id)
        if(auto.isDelete == true){
            return res.status(400).json({
                ok: false,
                msg: "Automobile hasn't been found"
            })
        }
        return res.status(200).json({
            ok: true,
            msg: auto,})
            
    } catch (error) {
        return res.status(400).json({
          ok: false,
          msg: error
        })
}}

export const addautomobile = async (req, res = response)=>{
    try{
        const{ 
         description,
        model,
        motorSerial,
        plaque,
        originalDate,
        serial,
        responsableName,
            }=req.body;


            const newauto =new automobiles({
                description,
                model,
                motorSerial,
                plaque,
                originalDate,
                serial,
                responsableName,
                creationDate: new Date().toISOString()
            });
            await newauto.save()

            return res.status(200).json({
                ok: true,
                msg: newauto
              })
    }catch (error){
        res.status(400).json({
            ok:false,
            msg : error
        })
    }
} 
export const editautomobile = async (req,res=response) =>{
    try{ 
    const {id} =req.params
    const{ 
        description,
        model,
        motorSerial,
        plaque,
        originalDate,
        serial,
        responsableName
        }=req.body;
//agregar algun metodo para que no se puedan duplicar placas y serie-motor

        const placasUsed= await automobiles.find({placas, _id: {$ne:id}})
        if (placasUsed.lengt>0){
            return res.status(400).json({
                ok:false,
                msg: 'Placas is used'
            })
        }

        const serieMotorUsed = await automobiles.find({motorSerial, _id:{$ne:id}})
        if(serieMotorUsed.length>0){
            return res.status(400).json({
                ok:false,
                msg: 'Placas is used'
            })
        }

        const updateauto= await automobiles.findByIdAndUpdate( id)
        updateauto.description=description
        updateauto.model=model
        updateauto.motorSerial=serieMotor
        updateauto.plaque=plaque
        updateauto.originalDate=originalDate
        updateauto.serial=serial
        updateauto.responsableName=responsableName
        updateauto.updateDate = new Date().toISOString()

        await updateauto.save()
        return res.status(200).json({
            ok: true,
            msg: updateauto
        })

        
    }catch (error) {
        res.status(400).json({
          ok: false,
          msg: error
        })
      }
}

export const deleteauto =async(req,res= response)=>{
    try{
        const {id}=req.params
        const deleteauto =await automobiles.findByIdAndUpdate(id)
        if(deleteauto==null){
            return res.status(400).json({
                ok:false,
                msg: "auto hasn't been found"
            })
        }
        deleteauto.isDelete = true
        await deleteauto.save()
        return res.status(200).json({
            ok: true,
            msg :'auto has ben deleted'
        })
    } catch (error) {
        return res.status(400).json({
          ok: false,
          msg: error
        })
      }
}