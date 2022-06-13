const express = require("express");
const { news , connection } = require("./db");

const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.get("/news/get", async (req, res) => {

    // const params = req.query
    const News = await news.find()
    return res.json(News)
    // res.send("Welcome")
});

app.post("/news/new" , async(req,res)=>{
    await news.insertMany({...req.body})
    return res.send("new news added")
})


const PORT = process.env.PORT || 8080

app.listen(PORT)
