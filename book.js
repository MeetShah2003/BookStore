const mongoose = require("mongoose");

const bookschema = mongoose.Schema({
    title: String,
    author: String,
    category: String,
    publicationYear: Number,
    price: Number,
    quantity: Number,
    description: String,
    imageUrl: String,
}, { timestamps: true });

const bookModel = mongoose.model('book', bookschema)

module.exports = { bookModel }