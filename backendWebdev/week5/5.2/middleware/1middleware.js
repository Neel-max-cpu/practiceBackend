export function calculate(req, res){
    // for fetching from the url - params
    const {operator} = req.params;
    // for fetching from the body
    const {a, b} = req.body;

    const num1 = parseInt(a);
    const num2 = parseInt(b);
    let result;
    switch(operator){
        case "sum":
            result = num1+num2;
            break;
        case "sub":
            result = num1-num2;            
            break;
        case "mul":
            result = num1*num2;
            break;
        case "div":
            if(num2===0){
                res.status(400).json({error:"Cannot be divided by zero"});
            }
            result = num1/num2;
            break;
        default:
            res.status(400).json({error:"invalid operator"});
            break;
    }
    return res.json({result});
}