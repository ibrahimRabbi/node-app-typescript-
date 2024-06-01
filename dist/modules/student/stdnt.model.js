"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentModel = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const nameSchema = new mongoose_1.Schema({
    first: { type: String, required: true, maxlength: [8, 'first name length can not be more then 5'], trim: true },
    middle: { type: String },
    last: { type: String, required: true },
});
const studentSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
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
    isDeleted: { type: Boolean, default: false }
});
//middleware.....
//this middleware will call before create or insert a document in the database
studentSchema.pre('save', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const enocodeGender = yield bcrypt_1.default.hash(this.password, 10);
        this.password = enocodeGender;
    });
});
//this middleware will call after create or insert a document in the database
studentSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});
//when find api will call then this middleware will work before query
studentSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
exports.studentModel = (0, mongoose_1.model)('student', studentSchema);
