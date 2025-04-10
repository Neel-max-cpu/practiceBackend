import express from "express";

const app = express();
app.use(express.json());

const port = 3000;
app.listen(port, ()=>{
    console.log(`app running on ${port}`);
})


// eg of map ---
/*
const nums = [1,2,3];
const double = nums.map(num=>num*2);    // [2,4,6];
console.log(double);
*/


// Assignment #1 - Create a map functions that takes 2 inputs an array and a 
// transformation callback/function and transform the array into a new one using 
// transformation function

function mymap(arr, transform){
    let res = [];
    for(let i=0; i<arr.length; i++){
        res.push(transform(arr[i]));
    }
    return res;
}

const original = [1,2,3,4,5];
const newOriginal = mymap(original, num=>num*num);
console.log(newOriginal);