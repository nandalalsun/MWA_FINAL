const jwt = require("jsonwebtoken");
const util = require("util");
const jwtVerifyPromise = util.promisify(jwt.verify, { context: jwt });



const authentication = (req, res, next) => {
    const responseData = {
        statusCode: 403,
        message: { message: "No token provided" }
    }

    const authHeader = req.headers.authorization;

    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(process.env.UNAUTHORIZED_CODE).json({ message: "Token is missing" });
    }
    else {
        jwtVerifyPromise(token, process.env.SECRET_KEY)
            .then(() => next())
            .catch((error) => _invalidTokenResponse(error, res, responseData))
    }

}

const _invalidTokenResponse = function (error, res, responseData) {
    console.log(error);
    responseData.statusCode = process.env.UNAUTHORIZED_CODE;
    responseData.message = process.env.UNAUTHORIZED_MESSAGE;
    res.status(responseData.statusCode).json(responseData.message);
}

module.exports = {
    authentication
}

