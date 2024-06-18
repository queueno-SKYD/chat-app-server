import HTTPResponse from "./response";
import HttpStatus from "./httpStatus";

const GetInternalServerError = (message:string, data?: any)=>{
  return new HTTPResponse({
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR.code,
    httpStatus: HttpStatus.INTERNAL_SERVER_ERROR.status,
    message: message,
    data : data ? data : []
  })
}

const GetSuccessServerMessage = (message:string, data?: any)=>{
  return new HTTPResponse({
    statusCode: HttpStatus.OK.code,
    httpStatus: HttpStatus.OK.status,
    message: message,
    data : data ? data : []
  })
}

const GetBadServerMessage = (message:string, data?: any)=>{
  return new HTTPResponse({
    statusCode: HttpStatus.BAD_REQUEST.code,
    httpStatus: HttpStatus.BAD_REQUEST.status,
    message: message,
    data : data ? data : []
  })
}


export {
  HTTPResponse,
  HttpStatus,
  GetInternalServerError,
  GetSuccessServerMessage,
  GetBadServerMessage
}
