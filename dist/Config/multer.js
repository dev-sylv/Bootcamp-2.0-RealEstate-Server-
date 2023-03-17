"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HouseUploads = exports.UserUploads = void 0;
const multer_1 = __importDefault(require("multer"));
const Storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const UserUploads = (0, multer_1.default)({
    storage: Storage
}).single("Image");
exports.UserUploads = UserUploads;
const HouseUploads = (0, multer_1.default)({
    storage: Storage
}).single("HouseImage");
exports.HouseUploads = HouseUploads;
