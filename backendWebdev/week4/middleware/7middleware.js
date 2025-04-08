// object
export const errorCount = {value:0};

export function errorHandler(err, req, res, next){
    errorCount.value++;
    console.error("Error occurred:", err.message);
    res.status(400).send("Something went wrong");
}