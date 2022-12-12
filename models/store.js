const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const storeSchema = new Schema ({
    name: String
});






module.exports = mongoose.model("Store", storeSchema);