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
exports.deleteController = exports.getData = exports.insertData = void 0;
const stdnt_services_1 = require("./stdnt.services");
const joi_1 = __importDefault(require("joi"));
const insertData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nameJoiSchema = joi_1.default.object({
        first: joi_1.default.string().trim().required(),
        middle: joi_1.default.string().trim(),
        last: joi_1.default.string().trim().length(5).required()
    });
    const joiSchema = joi_1.default.object({
        name: nameJoiSchema.required(),
        email: joi_1.default.string().email().required(),
        age: joi_1.default.number().max(25).min(15).required(),
        address: joi_1.default.string().required(),
        contactNo: joi_1.default.number().greater(10).required(),
        gender: joi_1.default.string().valid('female', 'male', 'trans-gender').required(),
        blood: joi_1.default.string().valid('A+', 'AB+', 'AB-', 'B+', 'o+').required(),
        password: joi_1.default.string().max(7).required()
    });
    try {
        const { error, value } = joiSchema.validate(req === null || req === void 0 ? void 0 : req.body);
        if (error) {
            res.status(500).send(error.details);
        }
        const inserted = yield (0, stdnt_services_1.studentService)(value);
        res.status(200).json({ success: true, inserted });
    }
    catch (err) {
        res.status(404).send(err.message);
    }
});
exports.insertData = insertData;
const getData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, stdnt_services_1.getDataservice)();
        res.status(200).send(data);
    }
    catch (err) {
        res.status(404).send(err.message);
    }
});
exports.getData = getData;
const deleteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req === null || req === void 0 ? void 0 : req.params.id;
    const deletFunc = yield (0, stdnt_services_1.deleteData)(id);
    res.send(deletFunc);
});
exports.deleteController = deleteController;
