"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
exports.userSchema = new mongoose_1.Schema({
    fullname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    image: {
        type: String,
        default: null,
    },
    info: {
        type: String,
        default: null,
    },
    region: {
        type: String,
        default: null,
    },
    in_site: {
        type: String,
        default: Date.now(),
    },
    study: {
        type: String,
        default: null,
    },
    sertificate: {
        type: String,
        default: null,
    },
    language: {
        type: String,
        default: null,
    },
    categories: { type: mongoose_1.Schema.Types.ObjectId, ref: "categories" },
    skills: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "skills" }],
});
