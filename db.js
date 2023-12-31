const mongoose = require("mongoose");

const connection = async () => {
    await mongoose.connect("mongodb+srv://meetshah21102003:meet@cluster0.gfenfue.mongodb.net/?retryWrites=true&w=majority");
    console.log("Database is Connected");
};

module.exports = { connection };