import { Request, Response } from "express";
import { deleteData, getDataservice, studentService } from "./stdnt.services";
import Joi from "joi";

export const insertData = async (req: Request, res: Response) => {

    const nameJoiSchema = Joi.object({
        first: Joi.string().trim().required(),
        middle: Joi.string().trim(),
        last: Joi.string().trim().length(5).required()
    })


    const joiSchema = Joi.object({
        name: nameJoiSchema.required(),
        email: Joi.string().email().required(),
        age: Joi.number().max(25).min(15).required(),
        address: Joi.string().required(),
        contactNo: Joi.number().greater(10).required(),
        gender: Joi.string().valid('female', 'male', 'trans-gender').required(),
        blood: Joi.string().valid('A+', 'AB+', 'AB-', 'B+', 'o+').required(),
        password: Joi.string().max(7).required()
    })

    try {
        const { error, value } = joiSchema.validate(req?.body)
        if (error) {
            res.status(500).send(error.details)
        }

        const inserted = await studentService(value)
        res.status(200).json({success:true, inserted})
    } catch (err:any) {
        res.status(404).send(err.message)
    }

}




export const getData = async (req: Request, res: Response) => {
    try {
        const data = await getDataservice()
        res.status(200).send(data)
    } catch (err: any) {
        res.status(404).send(err.message)
    }
}


export const deleteController = async (req:Request, res:Response) => {
    const id = req?.params.id
    const deletFunc = await deleteData(id)
    res.send(deletFunc)
}