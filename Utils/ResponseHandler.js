exports.ResponseHandler = (res,success,statusCode,message,data) => {
    const response = {
        success,
        statusCode,
        message,
        data
    }
    return res.status(statusCode).json(response)
}