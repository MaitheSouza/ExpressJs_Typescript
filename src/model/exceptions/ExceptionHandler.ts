import MessageStatus from "../enum/MessageStatus";
import HttpStatus from "../enum/HttpStatus";

class ExceptionHandler {
    constructor(public status: HttpStatus, public message: {[key: string]: string | MessageStatus}){}
}

export default ExceptionHandler;