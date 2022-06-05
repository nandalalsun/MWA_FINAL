const { ObjectId } = require("bson");
const { default: mongoose } = require("mongoose");

const { Music } = require("../model/music-model");

const getOne = (req, res) => {
    console.log("artist controller called...");

    const musicId = req.params.musicId;
    const artistId = req.params.artistId;

    if (!mongoose.isValidObjectId(artistId) && !mongoose.isValidObjectId(musicId)) {
        res.status(400).json({ Error: "MusicId or ArtistId is not valid" });
    }
    else {
        Music.findOne({ _id: musicId }).select("artist").exec((err, data) => {
            if (err) {
                res.status(500).json(err);
            }
            else if (!data) {
                res.status(404).json({ error: "ID not found" });

            }
            else {
                res.status(200).json(data.artist.id(artistId));
            }
        });
    }
}
const searchAll = function (req, res, count, offset) {


    const responseData = { status: 200, message: null };

    let searchQuery = ""
    if (req.query && (req.query.age || req.query.artist_name || req.query.bio)) {
        const searchObj = []

        if (req.query.age) {
            searchObj.push({
                age: {
                    $regex: req.query.age + ".*"
                }
            });

        }
        if (req.query.artist_name) {
            searchObj.push({
                artist_name: req.query.artist_name
            });
        }
        if (req.query.bio) {
            searchObj.push({
                bio: req.query.bio
            })
        }
        searchQuery = {
            $and: searchObj
        };

    }



    console.log(searchQuery.bio)
    Music.find(searchQuery).skip(offset).exec(function (err, song) {
        if (err) {
            responseData.status = 500;
            responseData.message = err;
        } else {
            responseData.status = 200;
            responseData.message = song;
        }
        res.status(responseData.status).json(responseData.message);
    })
}


const getAll = (req, res) => {

    let count = 5;
    let offset = 0;
    const maxCount = 10;
    const responseData = { status: 200, message: null };

    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);

    }
    if (req.query && req.query.offset) {
        count = parseInt(req.query.offset, 10);
    }

    if (count > maxCount) {
        responseData.status = 400;
        responseData.message = `count must be less than ${maxCount}`
        res.status(responseData.status).json(responseData.message);
        return;

    }
    if (isNaN(count) || isNaN(offset)) {
        responseData.status = 400;
        responseData.message = "offset and count must be digit";
        res.status(responseData.status).json(responseData.message);
        return;

    }

    if (req.query && (req.query.artist_name || req.query.age || req.query.bio)) {
        searchAll(req, res, count, offset);
    }
    else {
        let musicId = req.params.musicId;
        Music.findOne({ _id: musicId }).select("artist").skip(offset).limit(maxCount)
            .then(artist => {
                if (artist == null) {
                    responseData.status = 404;
                    responseData.message = "No artist found";
                }
                else {
                    responseData.status = 200;
                    responseData.message = artist;
                }
            })
            .catch(err => {
                responseData.status = 500;
                responseData.message = err;
            })
            .finally(() => {
                res.status(responseData.status).json(responseData.message);
            })
    }
}

const addOne = (req, res) => {
    const responseData = {
        statusCode: process.env.RECORD_CREATED_CODE,
        message: process.env.RECORD_CREATED
    }

    let artist_name = req.body.artist_name ? req.body.artist_name : "Unknown Artist";
    let bio = req.body.bio ? req.body.bio : "No bio";
    let age = req.body.age ? req.body.age : "";

    let musicId = req.params.musicId;

    let newArtist = {
        artist_name,
        bio,
        age
    }

    if (!(mongoose.isValidObjectId(musicId))) {
        responseData.statusCode = process.env.USER_INPUT_ERROR_CODE;
        responseData.message = "Invalid music Id";
    }

    if (responseData.statusCode == 201) {
        Music.updateOne({ _id: musicId }, { $push: { artist: newArtist } })
            .then((artist) => {
                responseData.message = artist;
            })
            .catch((err) => {
                responseData.message = err;
                responseData.statusCode = process.env.SERVER_ERROR_MESSAGE;
            })
            .finally(() => {
                res.status(responseData.statusCode).json(responseData.message);
            });
    }
    else {
        res.status(responseData.statusCode).json(responseData.message);
    }

}

const deleteOne = (req, res) => {
    let musicId = req.params.musicId;
    let artistId = req.params.artistId;

    const responseData = {
        statusCode: process.env.SUCCESSFUL_CODE,
        message: process.env.SUCCESSFUL_MESSAGE
    }

    if (!(mongoose.isValidObjectId(musicId) && mongoose.isValidObjectId(artistId))) {
        responseData.statusCode = process.env.USER_INPUT_ERROR_CODE;
        responseData.message = process.env.USER_INPUT_ERROR;
    }
    else {
        Music.findById({ _id: musicId })
            .then(music => {
                music.artist.id(artistId).remove();
                music.save()
                    .then(result => {
                        responseData.statusCode = process.env.SUCCESSFUL_CODE;
                        responseData.message = result;
                    })
                    .catch(err => {
                        responseData.statusCode = process.env.NOT_FOUND_STATUS_CODE;
                        responseData.message = process.env.NOT_FOUND_MESSAGE;
                    })
            })
            .catch(err => {
                responseData.statusCode = process.env.NOT_FOUND_STATUS_CODE;
                responseData.message = err;
            })
            .finally(() => {
                res.status(responseData.statusCode).json(responseData.message);
            })
    }

}


module.exports = {
    getOne,
    addOne,
    deleteOne,
    getAll
}