import { Schema, model } from "mongoose";
import { Name, Student } from "./stdnt.interfase";
import bcrypt from 'bcrypt'
 



const nameSchema = new Schema<Name>({
    first: { type: String, required: true, maxlength: [8, 'first name length can not be more then 5'], trim: true },
    middle: { type: String },
    last: { type: String, required: true },
})

const studentSchema = new Schema<Student>({
    id:{type:String,required:true},
    name: { type: nameSchema, required: true, trim: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    contactNo: { type: Number, required: true },
    gender: {
        type: String,
        enum: ['female', 'male', 'trans-gender'],
        required: true
    },
    blood: {
        type: String,
        enum: {
            values: ['A+', 'AB+', 'AB-', 'B+', 'o+'],
            message: '{VALUE} is not valid'
        },
        required: true
    },
    password: { type: String, required: true, maxlength: 7 },
    isDeleted:{type:Boolean, default:false}
})





//middleware.....


//this middleware will call before create or insert a document in the database
studentSchema.pre('save', async function () {
    const enocodeGender = await bcrypt.hash(this.password, 10)
    this.password = enocodeGender
})

//this middleware will call after create or insert a document in the database
studentSchema.post('save', function (doc,next) {
    doc.password = '';
    next()
})



//when find api will call then this middleware will work before query
studentSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } })
    next()
})


export const studentModel = model<Student>('student', studentSchema)