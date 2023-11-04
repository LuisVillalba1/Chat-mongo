"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRegister = exports.isString = void 0;
//verify if the param is a string
const isString = (string) => {
    return typeof string == "string";
};
exports.isString = isString;
const isRegister = (object) => {
    const requiredProperties = ['name', 'lastName', 'email', 'country', 'password', "passwordRepeat", 'city'];
    //verify that all properties are on the object
    return requiredProperties.every(prop => prop in object);
};
exports.isRegister = isRegister;
