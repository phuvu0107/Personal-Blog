const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
    {
        title: String,
        content: String,
        date: String
    }
)

module.exports = mongoose.model('blogDB', PostSchema);
