console.log(a); // undefined due to hoisting
var a = 10;
var b = 20;
console.log(a); // 20

function addnumbers(a, b) {
    var c = a + b;
    return c;
}

var result = addnumbers(a, b);
var result2 = addnumbers(5, 15);

console.log("Result 1: " + result);
console.log("Result 2: " + result2);


let a = 10;
const b = 20;

const addNumber = function(num1, num2) {
  const sum = num1 + num2;
  return sum;
};

const result = addNumber(a, b);

console.log(result); // 30

