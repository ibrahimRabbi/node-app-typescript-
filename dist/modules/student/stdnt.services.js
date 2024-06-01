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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteData = exports.getDataservice = exports.studentService = void 0;
const stdnt_model_1 = require("./stdnt.model");
const studentService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const inserted = yield stdnt_model_1.studentModel.create(data);
    return inserted;
});
exports.studentService = studentService;
const getDataservice = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield stdnt_model_1.studentModel.find({
        $and: [
            { "name.first": { $ne: 'MUHAMMAD' } },
            { age: { $gte: 24 } },
        ]
    }).sort({ age: 1 });
    return data;
});
exports.getDataservice = getDataservice;
const deleteData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleting = yield stdnt_model_1.studentModel.updateOne({ id: id }, { $set: { isDeleted: true } });
    return deleting;
});
exports.deleteData = deleteData;
