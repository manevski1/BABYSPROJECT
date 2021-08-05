import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    recipe: String,
    name: String,
    creator: String,
    selectedFile: String,
    category: String,
    prepTime: String,
    pplNumber: String,
    shortDesc: String,
    likes: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;