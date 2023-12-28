const { nanoid } = require('nanoid')
//Modal imported
const URL = require('../model/url')


//control function-1
const handleGenerateNewShortURL = async (req, res) => {
    const body = req.body;
    
    if (!body.url) return res.status(400).json({ error: "url is required" });
    const ShortID = nanoid(8);
    await URL.create({
        shortId: ShortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });

    return res.render('home', {
        id: ShortID,
    });

}

//control function-2
const handleshowanalytics = async (req, res) => {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });

    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}

//control function-3
const handleredirectURl = async (req, res) => {

    try {
        const ShortId = req.params.ShortId;
        let entry = await URL.findOneAndUpdate({
            shortId: ShortId,
        },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                    }
                }
            });


        if (entry != null) {

            const st = "https:"
            if (st.localeCompare(entry["redirectURL"].substring(0, 9))) {
                res.redirect(entry.redirectURL);
            }
            else {
                const url = entry.redirectURL;
                console.log(url);
                res.redirect("https://" + entry["redirectURL"]);
            }
        }
        else {
            res.status(404).send("Short URL not found");
        }
    }
    catch (error) {
        console.error("Error while retrieving URL entry:", error);
        res.status(500).send("Internal Server Error");
    }
}


const getallurl = async (req, res) => {
    const result = await URL.find({ createdBy: req.user._id });
    res.render("home.ejs", { urls: result })
}







module.exports = {
    handleGenerateNewShortURL,
    handleshowanalytics,
    handleredirectURl,
    getallurl,
}