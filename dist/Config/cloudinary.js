"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const cloud = cloudinary_1.v2.config({
    cloud_name: "dev-sylvia",
    api_key: "816323284624162",
    api_secret: "1lOIWeMpkvIEeNxUHJ4I9YOS-GA",
    secure: true
});
exports.default = cloud;
