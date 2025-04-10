export function logger(req, res, next){
    const url = req.url;
    const method = req.method;
    // const time = Date.now();
    const time = new Date().toISOString();  // more readable formate than Date.now()
    console.log(`Method: ${method}, URL: ${url}, Time: ${time}`);
    next();
}