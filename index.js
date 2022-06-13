const express = require("express");
const { news , connection } = require("./db");

const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.get("/news/get", async (req, res) => {
    res.send("Welcome")
});

app.get("/news/get",async(req,res)=>{

  if(req.query.Location){
    let loc = await news.find({Location:req.query.Location})
    return res.json(loc)
  }
  if(req.query.author){
    let aut = await news.find({Author:req.query.author})
    return res.json(aut)
  }
  if(req.query.tag){
    let tag = await news.find({Tags:req.query.tag})
    return res.json(tag)
  }
  if(req.query.title){
    let t = await news.find({Title:req.query.Title})
    let view = t[0].Total_views+1
    await news.updateOne({Title:t},{$set:{Total_views:view}})
    t = await news.find({Title:t})
    return res.json(t)
  }
  if(req.query.id){
    let t = await news.find({_id:req.query.id})
    let view = t[0].Total_views+1
    await news.updateOne({_id:req.query.id},{$set:{Total_views:view}})
    t = await news.find({_id:req.query.id})
    return res.json(t)
  }

})
app.post("/news/new" , async(req,res)=>{
    await news.insertMany({...req.body})
    return res.send("new news added")
})


const PORT = process.env.PORT || 8080

app.listen(PORT,async()=>{
  try {
    await connection;
    console.log("Connected");
  } catch (error) {
    console.log("error");
  }
  console.log("Server started")
})
