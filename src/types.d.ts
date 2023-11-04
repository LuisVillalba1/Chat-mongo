
export interface ErrorMessage{
    message : ErrorMessage
}

export interface ErrorType extends ErrorMessage {
    type : ErrorType
}

export interface Register {
    name : string,
    lastName : string,
    userName : string,
    email : string,
    country : string,
    city : string,
    password : string,
    passwordRepeat : string,
    // [key: string]: string; // index signature,with that ts know all Register properties are strings
}

export interface NewRegister extends Omit<Register, 'passwordRepeat'>{
    loginAttempts: number,
    isLocked: boolean,
    lockedUntil: Date | null
}


export interface Sigin{
    email : string,
    password : string
}

export interface RecuperateAccount extends Omit<Sigin,"password">{

}


declare global {
    namespace Express {
      interface Request {
        user: NewRegister;
      }
    }
}