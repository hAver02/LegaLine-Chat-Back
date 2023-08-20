

function validatorError(validacion){
    if(!Array.isArray(validacion)) return false 
    if(validacion[0] === false) return true
    return false
}


function logError (err, req, res, next){
    // console.log(err.message);
    next(err)
}

function handleError(err, req, res, next) {
    // console.log('llegamos aca?');
    res.json({
        ok : false,
        message : err.message
    })
}


module.exports = {logError, handleError, validatorError}