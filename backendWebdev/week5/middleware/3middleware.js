let count = 0;
export function logger2(req, res, next){
    count++;
    next();
}

export {count};