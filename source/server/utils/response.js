
const Response = (res, success, message) => {
    return res.json({
        Success: success,
        Message: message,
    })
}

module.exports = Response;