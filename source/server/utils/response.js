
const Response = (res, success, message) => {
    return res.json({
        data: {
            success: success,
            message: message,
        },
    })
}

module.exports = Response;