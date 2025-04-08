let requestCount = 0;

export function requestLogger(req, res, next){
    requestCount++;
    console.log(`Request #${requestCount} -> ${req.method} ${req.url}`);
    next();
}


export function getCount(req, res){
    res.json({totalRequests: requestCount});
};