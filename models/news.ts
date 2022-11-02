import mongoose, { Schema, model } from "mongoose";

const newsSchema = new Schema({
    userIdNews: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String,
    title: String,
    date: { type: Date, default: Date.now },
    comments: [{ body: String, date: Date, userIdComment: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, }],
    hidden: Boolean,
    meta: {
        votes: Number,
        favs: Number,
    },
});

const News = model("News", newsSchema);
export default News;
