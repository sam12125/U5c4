const mongoose = require("mongoose")
const {Schema , model} = require("mongoose")

const connection = mongoose.connect("mongodb://localhost:27017/news");

const newsSchema = new Schema({
    Title: String,
    Description: String,
    Date: Date,
    Author:{type:String,
        enum:["Mathias Newburn","Rey Rutty" , "Magdaia Shellard" , "Kathrine Faichney"]},
    Location:{type:String,
        enum:["London","New york"]},
    tags: {type:String,
        enum:["politics","crime" , "tech" , "sports" , "health"]},
    total_views: Number,
    category: {type:String,
        enum:["trending","top"]}
})

const news = model("new" , newsSchema)

module.exports = {news , connection}
