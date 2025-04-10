let result = 0;
export function logger2(req, res, next){
    result++;
    next();

}

export function count(req, res){
    res.send(`${result} number of times server got hit!`);
}