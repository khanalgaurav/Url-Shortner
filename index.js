const express = require("express")
const urlRoute = require('./src/Routes/url')
const {connectToMongoDB} = require('./connect')
const URL = require('./src/Models/url')

const app = express();
const PORT = 8000;

connectToMongoDB('mongodb://localhost:27017/urlshortner').then(console.log('Connected to DB'));


app.use(express.json());
app.use("/url",urlRoute);
app.get('/:shortId',async (req,res)=>{
    const shortId = req.params.shortId;
    
    const entry = await URL.findOneAndUpdate({
        shortId,
    },{
        $push:{
            visitHistory:[{
                timestamp: Date.now()
            }]
        }
    },{new:true});
    
    if(entry !== null){
        res.redirect(entry.redirectURL)
    }
    else{
        res.status(400).json({error : "There is no such url in my Database"})
    }
})


app.listen(PORT,()=>console.log(`Server Started at Port: ${PORT}`)
)