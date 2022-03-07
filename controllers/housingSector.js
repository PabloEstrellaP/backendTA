import { response } from "express";
import req from "express/lib/request";
import res from "express/lib/response";
import housingSector from "../models/mongo/housingSector";
import { deleteIT } from "./IT.JS";


export const gethousing = async(req,res=response)=>{
    try{
        const housing=await housingSector.find({isDalete: false})
        return res.status(200).json({
            ok:true,
            msg: housing
        })
    }catch(error){
        return res.status(400).json({
            ok:true,
            msg :error
        })
    }
}
export const gethousingBYid = async (req,res=response)=>{
    try{
        const{id}=req.params
        const housing=await housingSector.findById(id)
        if(housing.isDalete==true){
            return res.status(400).json({
                ok: false,
                msg: "housing hasn't been found"
            })
        }return res.status(200).json({
            ok: true,
            msg: housing,})
    }
    catch (error) {
        return res.status(400).json({
          ok: false,
          msg: error
        })

}
}
export const addhousing=async(res,req=response)=>{
    try{
        const{
            model,
            cost,
            description,
            serial,
            responsableName
        }=req.body;
        const newhousing=new  IT({
            model,
            cost,
            description,
            serial,
            responsableName,
            creationDate:new Date().toISOString()
        });
        await newhousing.save()
        return res.status(200).json({
            ok: true,
            msg: newhousing
          })
        
    }catch (error){
        res.status(400).json({
            ok:false,
            msg : error
        })
    }
}
export const edithousing = async (req,res=response)=>{
    try{
        const {id}=req.params
        const{
            model,
            cost,
            description,
            serial,
            responsableName
        }= req.body;

         //agregar algun metodo para que el serial no se repita???(preguntar a tzap)


        const updatehousing=await IT.findByIdAndUpdate(id)
        updatehousing.model=model
        updatehousing.cost=cost
        updatehousing.description=description
        updatehousing.serial=serial
        updatehousing.responsableName=responsableName
        updatehousing.updateDate=new Date().toISOString()


        await updatehousing.save()
        return res.status(200).json({
            ok:true,
            msg:updatehousing
        })

    }catch (error) {
        res.status(400).json({
          ok: false,
          msg: error
        })
      }
   
}
export const deletehousing=async(req,res=response)=>{
    try{
        const{id}=req.params
        const deletehousing=await housingSector.findByIdAndUpdate(id)
        if(deletehousing=null){
            return res.status(400).json({
                ok:false,
                msg: "housing hasn't been found"})

        }
        deletehousing.isDelete=true
        await deleteIT.save()
        return res.status(200).json({
            ok: true,
            msg :'it has ben deleted'
    })
    }catch (error) {
        return res.status(400).json({
          ok: false,
          msg: error
        })
      }
    }
