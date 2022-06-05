const router = require("express").Router();

const authController = require("../controller/authenticationController");


router.route("/create")
    .post(authController.createUser);

router.route("/login")
    .post(authController.loginUser);


const page_not_found = (req, res) => {
    res.status(404).json({ Error: "Page not found" });
}

router.route("*")
    .get(page_not_found)
    .post(page_not_found)
    .patch(page_not_found)
    .delete(page_not_found);


module.exports = router;