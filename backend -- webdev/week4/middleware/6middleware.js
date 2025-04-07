
// object
const numberOfRequestForUsers={}

// every 5s it gets resets
setInterval(() => {
    for(let user in numberOfRequestForUsers){
        numberOfRequestForUsers[user] = 0;
    }
}, 5000);

export function checklimitar(req, res, next){
    const userId = req.headers["user-id"];

    if(!userId){
        return res.status(400).send("Missing 'user-id' header");
    }

    if(!numberOfRequestForUsers[userId]){
        numberOfRequestForUsers[userId] = 1;
    }
    else numberOfRequestForUsers[userId]++;

    if(numberOfRequestForUsers[userId] > 2){
        return res.status(404).send("Rate limit exceeded");
    }

    next();
}