var mongoose = require('mongoose');
var postSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
}, {usePushEach: true});

module.exports = mongoose.model("Post", postSchema);