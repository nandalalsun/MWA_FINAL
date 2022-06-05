const { default: mongoose } = require("mongoose");
const { Music } = require("../model/music-model");

const ifValidLength = (music_rating) => {
    if (isNaN(music_rating) || music_rating > 10 || music_rating < 0) {
        return false;
    }
    else {
        return true;
    }
}

const addOne = function (req, res) {
    if (!req.body.music_name) {
        console.log("Invalid music");
        res.status(400).json("Music name must be provided");
    }
    else {
        console.log("Reading data...");

        let music_name = req.body.music_name;
        let description = req.body.description || "No description";
        let music_type = req.body.music_type || "Unknown";
        let music_rating = req.body.music_rating;
        let artist_name = req.body.artist || "Unknown";
        let bio = req.body.bio || "No bio";
        let age = req.body.age;

        let artist_info = {
            artist_name: artist_name,
            bio: bio,
            age: age
        }

        let newMusic = {
            music_name,
            description,
            music_rating,
            music_type,
            artist: artist_info
        }

        Music.create(newMusic, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).json(err);
            }
            else {
                res.status(201).json(data);
            }
        });
    }
}
const deleteOne = function (req, res) {
    let musicId = req.params.musicId;
    let isValidId = mongoose.isValidObjectId(musicId);

    if (!isValidId) {
        console.log("Invalid music Id");
        res.status(400).json({ message: "Invalid music id" });
    }
    else {
        Music.deleteOne({ _id: musicId })
            .then((delet) => {
                if (delet.deletedCount == 0) {
                    console.log(delet);
                    res.status(404).json({ "Delete failed: ": "No data found to delete" });
                }
                else {
                    console.log("Data deleted");
                    res.status(200).json({ message: "Delete Successful." })
                }
            });
    }


}

const getOne = function (req, res) {
    let musicId = req.params.musicId;
    let isValidId = mongoose.isValidObjectId(musicId);

    if (!isValidId) {
        res.status(400).json({ message: "Invalid music id" });
        return;
    }

    else {
        Music.findById({ _id: musicId })
            .then(music => {
                if (music == null) {
                    res.status(404).json({ message: "Music not found with the provided id" });
                }
                else {
                    res.status(200).json(music);
                }
            }).catch(err => {
                res.status(process.env.SERVER_ERROR_CODE).json({ message: process.env.SERVER_ERROR_MESSAGE, Error: err });
            });
    }
}



const _search = (req, res) => {
    let responseData = {
        statusCode: 200,
        message: "Successful"
    }
    console.log("Searching...");
    const music_name = req.query.searchString;
    const query = {
        "music_name": { $regex: music_name }
    };
    Music.find(query)
        .then(music => {
            responseData.message = music;
        }).catch(err => {
            responseData.statusCode = process.env.SERVER_ERROR_CODE;
            responseData.message = err;
        })
        .finally(() => {
            res.status(responseData.statusCode).json(responseData.message);
        })
        ;
}

const getAll = function (req, res) {
    let count = 5;

    let responseData = {
        statusCode: 200,
        message: "Successful"
    }

    if (req.query.count) {
        if (!ifValidLength(req.query.count)) {
            responseData.statusCode = 400;
            responseData.message = "Count number is either not a number or more than 10 or less than 0"
        }
        else {
            count = req.query.count;
        }
    }

    let offset = 0;

    if (req.query.offset) {
        if (isNaN(req.query.offset)) {
            responseData.statusCode = 400;
            responseData.message = "Offset is not a number"
        }
        else {
            offset = req.query.offset;
        }
    }

    if (responseData.statusCode != 200) {
        res.status(responseData.statusCode).json(responseData.message);
    }
    else {
        if (req.query.searchString) {
            _search(req, res);
        }
        else {
            Music.find({}, null, { skip: offset, limit: count })
                .then(music => {
                    responseData.message = music;
                })
                .catch(err => {
                    responseData.statusCode = process.env.SERVER_ERROR_CODE;
                    responseData.message = process.env.SERVER_ERROR_MESSAGE;
                })
                .finally(() => {
                    res.status(responseData.statusCode).json(responseData.message);
                });
        }
    }
}


const partialupdate = (req, res) => {
    _update(req, res, _partialUpdateCallback)
}


const fullUpdate = (req, res) => {
    _update(req, res, _fullUpdateCallback);
}

const _update = (req, res, callBackFunction) => {
    const musicId = req.params.musicId;
    if (!(mongoose.isValidObjectId(musicId))) {
        res.status(400).json({ Error: "MusicId is not a valid id" });
    }
    else {
        Music.findById({ _id: musicId }, (err, music) => {
            if (err) {
                res.status(404).json(err);
            }
            else {
                let newMusic = callBackFunction(req, music);

                Music.updateOne({ _id: musicId }, { $set: newMusic })
                    .then(music => {
                        res.status(200).json(music);
                    })
                    .catch(err => {
                        res.status(400).json({ "Error": err });
                    });
            }
        });
    }
}

const _partialUpdateCallback = (req, music) => {
    console.log("Partial callback called...");

    let music_name = req.body.music_name || music.music_name;
    let description = req.body.description || music.description;
    let music_rating = req.body.music_rating || music.music_rating;
    let music_type = req.body.music_type || music.music_type;

    let artist = music.artist;


    let newMusic = {
        music_name: music_name,
        description: description,
        artist: artist,
        music_type: music_type,
        music_rating: music_rating
    }

    return newMusic;
}
const _fullUpdateCallback = (req, _) => {
    let newMusic = {
        music_name: req.body.music_name,
        description: req.body.description,
        music_rating: req.body.music_rating,
        artist: [{
            artist_name: req.body.artist_name,
            bio: req.body.bio,
            age: req.body.age
        }],
        music_type: req.body.music_type
    }
    return newMusic;
}

module.exports = {
    addOne,
    deleteOne,
    getOne,
    getAll,
    partialupdate,
    fullUpdate
}