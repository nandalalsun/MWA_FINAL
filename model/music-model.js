const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArtistInfo = new Schema({
    artist_name: {
        type: String
    },
    bio: {
        type: String
    },
    age: {
        type: Number,
        max: 100,
        min: 0
    }
});

const MusicSchema = new Schema({

    music_name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    music_rating: {
        type: Number,
        max: 5
    },
    music_type: {
        type: String,
    },
    artist: {
        type: [ArtistInfo]
    }

});

const AuthenticationSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        min: 5,
        max: 50
    },
    password: {
        type: String,
        required: true,
        min: 5,
        max: 50
    }
})

module.exports = {
    Music: mongoose.model("Music", MusicSchema, "music"),
    Artist: mongoose.model("Artist", ArtistInfo, "artist"),
    Authentication: mongoose.model("Authentication", AuthenticationSchema, "users")
}