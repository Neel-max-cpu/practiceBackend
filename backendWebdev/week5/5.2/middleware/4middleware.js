export function summer(req, res){
    const {a,b} = req.body;
    if (isNaN(a) || isNaN(b)) {
        return res.status(400).send("Both 'a' and 'b' should be numbers.");
    }
    /*
    isNaN(5);         // false (because 5 is a number)
    isNaN("5");       // false (because "5" gets coerced into a number)
    isNaN("hello");   // true (can't be converted to a number)
    isNaN(undefined); // true
    isNaN(null);      // false (null gets coerced into 0)

    */
    const num1 = parseInt(a);
    const num2 = parseInt(b);
    let result = num1+num2;
    return res.send(`the sum of the values are ${result}`);
}
