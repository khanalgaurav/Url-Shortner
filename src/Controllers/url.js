function nanoid(len){
    let a='1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let b='';
    for(let i=0;i<len;i++){b=b+a[Math.floor(Math.random()*62)]}
    return b;   
}
const URL = require('../Models/url')
async function handleGenerateNewShortUrl(req,res) {
    const shortID = nanoid(8);
    const body = req.body;
    if(!body.url){return res.status(400).json('URL not provided')};
    await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        visitHistory:[],
    });
    return res.json({id: shortID})
}

async function handleGetAnalytics(req,res) {
    const shortId = req.params.shortId;
    result = await URL.findOne({shortId})
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    })

}
module.exports={handleGenerateNewShortUrl,handleGetAnalytics}
