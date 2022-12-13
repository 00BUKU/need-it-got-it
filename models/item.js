const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const itemSchema = new Schema(
    {
        name: String,
        user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        userName: String,
        userAvatar: String
    },
    {
        timestamps: true,
    }
);

const storeSchema = new Schema ({
    name: String,

    items: [itemSchema]
});






module.exports = mongoose.model("Store", storeSchema);