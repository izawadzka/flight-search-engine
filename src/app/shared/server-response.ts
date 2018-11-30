import { CustomError } from "./custom-error";

export class ServerResponse<T>{
    constructor(private resultValues: Array<T>,private  error : CustomError = null){}

    hasError():boolean{
        return this.error != null;
    }
    
    getValues(): Array<T>{
        return this.resultValues;
    }

    getError(): CustomError{
        return this.error;
    }
}