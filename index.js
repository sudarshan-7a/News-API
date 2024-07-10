import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import 'dotenv/config';

const app=express();
const port=3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("./index.ejs");
    
})
app.post("/Lookup", async (req,res)=>{
    console.log(req.body);
    
    const APIURL="https://newsapi.org/v2/everything?q="+req.body["q"]+"&from="+req.body["from"]+"&to="+req.body["to"]+"&sortBy="+req.body["sortBy"]+"&language="+req.body["language"]+"&apiKey="+
    process.env.APIkey;
    try {
        console.log(APIURL);
        const response= await axios.get(APIURL);
        res.render('./index.ejs', { data: response.data, no: req.body["no"] });
    } catch (error) {
        console.log(error)
        
    }
})
app.listen(port,()=>{
    console.log(`listening to port ${port}`);
})