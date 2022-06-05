const router = require("express").Router();
const musicController = require("../controller/musicController");
const mid = require("../controller/authenticate");

router.route("")
    .get(musicController.getAll)
    .post(mid.authentication, musicController.addOne);

router.route("/:musicId")
    .get(musicController.getOne)
    .delete(mid.authentication, musicController.deleteOne)
    .patch(mid.authentication, musicController.partialupdate)
    .put(mid.authentication, musicController.fullUpdate);


const page_not_found = (req, res) => {
    res.status(404).json({ Error: "Page not found" });
}

router.route("*")
    .get(page_not_found)
    .post(page_not_found)
    .patch(page_not_found)
    .delete(page_not_found);



module.exports = router;
