const { Authentication } = require("../model/music-model");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const saltRounds = parseInt(process.env.SAULT_ROUND);


const createUser = (req, res) => {
    const responseData = {
        statusCode: process.env.RECORD_CREATED_CODE,
        message: process.env.RECORD_CREATED
    }
    const _errorHandel = (error) => {
        responseData.statusCode = process.env.SERVER_ERROR_CODE;
        responseData.message = "" + error
    }

    if (!(req.body.username)) {
        responseData.statusCode = 400;
        responseData.message = "Username must be provided";
    }
    if (!req.body.password) {
        responseData.statusCode = 400;
        responseData.message = "Password must be provided";
    }

    if (responseData.statusCode == 201) {


        const newUserData = {
            username: req.body.username,
        }

        bcrypt.hash(req.body.password, saltRounds)
            .then(hash => {
                newUserData.password = hash
                const newUser = new Authentication(newUserData);

                newUser.save()
                    .then(newUser => responseData.message = newUser)

                    .catch(err => _errorHandel(err))

                    .finally(_ => res.status(responseData.statusCode).json(responseData.message))
            });

    }
    else {
        res.status(responseData.statusCode).json(responseData.message);
    }

}


const loginUser = (req, res) => {
    const responseData = {
        statusCode: process.env.SUCCESSFUL_CODE,
        message: process.env.SUCCESSFUL_MESSAGE,
        accessToken: ""
    }
    if (!(req.body.username || req.body.password)) {
        responseData.statusCode = process.env.USER_INPUT_ERROR_CODE;
        responseData.message = "Username and password required";
    }
    if (responseData.statusCode == 200) {
        Authentication.findOne({ username: req.body.username })
            .then((user) => {
                _validateUser(user, req, res, responseData);
            })
            .catch(error => {
                responseData.statusCode = process.env.SERVER_ERROR_CODE;
                responseData.message = + error;
                _sendResponse(responseData, res);
            })
    }
    else {
        res.status(responseData.statusCode).json(responseData.message);
    }

}

const _sendResponse = (responseData, res) => {
    res.status(responseData.statusCode).json(responseData);
}

const _validateUser = (user, req, res, responseData) => {
    console.log("Validating user");
    if (!user) {
        responseData.statusCode = process.env.UNAUTHORIZED_CODE;
        responseData.message = process.env.UNAUTHORIZED_MESSAGE;
    }
    else {
        bcrypt.compare(req.body.password, user.password)
            .then(match => {
                if (match) {
                    const accessToken = jwt.sign({ username: req.body.username }, process.env.SECRET_KEY, { expiresIn: parseInt(process.env.TOKEN_EXPIRY) });
                    console.log(accessToken);
                    responseData.statusCode = process.env.SUCCESSFUL_CODE;
                    responseData.accessToken = accessToken;
                    responseData.tokenExpire = process.env.TOKEN_EXPIRY;
                    responseData.message = process.env.SUCCESSFUL_MESSAGE;
                }
                else {
                    responseData.statusCode = process.env.UNAUTHORIZED_CODE;
                    responseData.message = process.env.UNAUTHORIZED_MESSAGE;
                }

            }).catch(error => {
                responseData.statusCode = process.env.SERVER_ERROR_CODE;
                responseData.message = "" + error;
            })
            .finally(() => {
                _sendResponse(responseData, res);
            })
    }
}

module.exports = {
    createUser,
    loginUser
}