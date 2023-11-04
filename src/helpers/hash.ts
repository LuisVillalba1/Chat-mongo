import bcrypt from "bcryptjs";

//generate a hash with de password entered
export const generateHash = async(text : string):Promise<string>=>{
    const hash = await bcrypt.hash(text,10);
    return hash
}

//compare the passwords
export const compareHash = async(password : string,hasPassword : string):Promise<boolean>=>{
    return await bcrypt.compare(password,hasPassword)
}