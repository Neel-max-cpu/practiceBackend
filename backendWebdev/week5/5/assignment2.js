import express from "express";
const app = express();
app.use(express.json());
const port = 3000;
app.listen(port, ()=>{
    console.log(`app running on the ${port}`);
})

// Assignment #2 - Create a map functions that takes an array and a transform function 
// as input and returns the transformed array as output

function mymap(arr, transform){
    let res = [];
    for(let i =0; i<arr.length; i++){
        res.push(transform(arr[i]));
    }
    return res;
}

const original = [1,2,3,4,5];
const newOriginal = mymap(original, (x=>x*2));
const newOriginal2 = original.map(x=>x*10);

console.log(newOriginal);
console.log(newOriginal2);

