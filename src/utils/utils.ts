

//verify if the param is a string
export const isString = (string : any):boolean=>{
    return typeof string == "string"
}

// export const isNewRegister = (object: any): object is NewRegister => {
//     const requiredProperties = ['name','lastName' ,'email', 'country','password','city'];
//     //verify that all properties are on the object
//     return requiredProperties.every(prop => prop in object);
// }

