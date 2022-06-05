const router = require("express").Router();
const artistController = require("../controller/artistController");
const mid = require("../controller/authenticate");


router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next();
});

router.route("/:musicId/artist/:artistId")
    .get(artistController.getOne)
    .delete(mid.authentication, artistController.deleteOne);

router.route("/:musicId")
    .get(artistController.getAll)
    .post(mid.authentication, artistController.addOne);


module.exports = router;