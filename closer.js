// let global  = 30;

// function closer() {
//     let global = 20;
//     function inner() {
//         let global = 10;
//         console.log(global);
//     }
//     inner(); 
//     console.log(global);
// }
// closer();


function outside() {
    function inside() {
        console.log("Hello from inside! ");
    }
    return inside;
}

const count = outside();
console.log(count);
count();


function makeMultiplier() {
    let count  = 0;
    function increment() {
        count++;
        return count;
    }
    return increment;
}

const counter = makeMultiplier(); 
console.log(counter());
console.log(counter());
console.log(counter());