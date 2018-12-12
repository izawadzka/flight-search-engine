export class CustomError{
   constructor(private statusCode: number, private message: string = "Request error. Check your connection to server"){}

   getMessage(): string{
       return this.message;
   }

   getStatusCode(): number{
       return this.statusCode;
   }
}