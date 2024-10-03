// const asyncHandler = (fn) => async(req, res, next) => {
//     try {
//         await fn(req, res, next)
        
//     } catch (error) {
//         res.status(err.code || 500).json({succes: false, message: err.message})
//     }
// }/

const asyncHandler = (reequestHandler) => {
    return (req, res, next) => {
        Promise.resolve(reequestHandler(req, res, next)).catch((err) => next(err))
    }
}

export {asyncHandler}  