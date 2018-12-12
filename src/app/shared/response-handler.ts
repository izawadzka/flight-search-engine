import { ToastrService } from "ngx-toastr";
import { CustomError } from "./custom-error";

export class ResponseHandler{
    constructor(private toastr : ToastrService){}

    showError(action: string, error?: CustomError){
        console.log(error);
        this.toastr.error(`Failed to ${action}. Check Your connection to server`)
    }

    showSuccess(action: string){
        this.toastr.success(`Successfully ${action}!`)
    }

    showInfo(message: string){
        this.toastr.info(message)
    }
}