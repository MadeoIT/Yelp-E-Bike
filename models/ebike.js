var mongoose = require('mongoose');
var ebikeSchema = new mongoose.Schema ({
    model: String,
    brand: String,
    power: Number,
    bikeClass: String,
    picture: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
}, {usePushEach: true});

var EBike = mongoose.model("EBike", ebikeSchema);
module.exports = EBike;