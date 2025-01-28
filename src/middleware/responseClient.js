

export const responseClient = ({req,res,message, jwts, statusCode=200})=>{
// success
req.successResponse = ()=>{
    return res.status(statusCode).json({
      status: 'success',
      message,
      payload: jwts
    })
}
// error
 req.errorResponse = ()=>{
    return res.status(statusCode).json({
        status:"error",
        message
    })
}
if(statusCode>=200 && statusCode<300){
    req.successResponse()
}else{
    req.errorResponse()
}
}