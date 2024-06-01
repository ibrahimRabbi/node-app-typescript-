import { Student } from "./stdnt.interfase";
import { studentModel } from "./stdnt.model";

export const studentService = async (data:Student) => {
    const inserted = await studentModel.create(data)
    return inserted
}



export const getDataservice = async () => {
    const data = await studentModel.find({
        $and: [
            { "name.first": { $ne: 'MUHAMMAD' }},
            { age: { $gte: 24 } },
       ]
    }).sort({ age: 1 })
    
    return data
}



export const deleteData = async (id: string) => {
     
    const deleting = await studentModel.updateOne(
        { id: id },  
        {$set:{isDeleted:true}}
    )
    return deleting
}