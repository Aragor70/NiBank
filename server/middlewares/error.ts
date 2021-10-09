import ErrorResponse from "../utils/ErrorResponse";

const errorHandler = (err: any, req: any, res: any, next: any) => {

    let error = { ...err };

    error.message = err.message

    
    // if unique record exists in mongodb already - duplication 
    if (error.code === 11000) {
        const location = Object.keys(err.keyValue)[0]
        error = new ErrorResponse(`This ${location} already exists.`, 400)
    }
    
    // case of unhandled error
    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Server error.'
    })
}
export default errorHandler;