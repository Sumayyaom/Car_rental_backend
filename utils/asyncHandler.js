const asyncHandler = (fn) => async (req,res,next) =>{
    try {
        await fn(req,res,next)
    } catch (err) {
        console.error(err.message);
        res.status(err.status||500).send(err.message)
    }
}

export default asyncHandler