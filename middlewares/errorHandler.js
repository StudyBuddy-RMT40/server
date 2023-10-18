const errorHandler = (err, req, res, next) => {
    console.log(err)
    let status = 500
    let message = 'Internal server error'

    if (err.name === 'empty_username') {
        status = 400
        message = 'Username is required'
    } else if (err.name === 'empty_email') {
        status = 400
        message = 'Email is required'
    } else if (err.name === 'empty_password') {
        status = 400
        message = 'Password is required'
    } else if (err.name === 'unique_email') {
        status = 400
        message = 'This email is invalid'
    } else if (err.name === 'invalid_email') {
        status = 404
        message = 'This email has not register'
    } else if (err.name === 'invalid_password') {
        status = 404
        message = 'This password is invalid'
    } 

    res.status(status).json({ message })
}

module.exports = errorHandler