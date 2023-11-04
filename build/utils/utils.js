"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isString = void 0;
//verify if the param is a string
const isString = (string) => {
    return typeof string == "string";
};
exports.isString = isString;
// export const isNewRegister = (object: any): object is NewRegister => {
//     const requiredProperties = ['name','lastName' ,'email', 'country','password','city'];
//     //verify that all properties are on the object
//     return requiredProperties.every(prop => prop in object);
// }
