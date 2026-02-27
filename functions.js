// //  functions 

// // function greeting (){
// //     console.log(" Hello Guys I am Vivek");
// //     return;
// // }

// console.log(greeting());


// // function addNumber(num1,num2){
// //     const sum = num1+num2;
// //     console.log("total Sum :" ,sum);
// // }
// // addNumber(10,20);


// // function Number(num1,num2,num3=0,num4=0){
// //     const sum = num1+num2+num3+num4;
// //     console.log("total Sum :" ,sum);
// // }

// // Number(10,20,30,40);
// // Number(10,20);
// // Number(10,20,30);


// // function number(...num){
// //     let total = 0;
// //     for(let i=0;i<num.length;i++){
// //         total+=num[i];

// //     }
// //     console.log("Total sum of No :" ,total);
// // }
// // number(10,20,30,40,50);
// // number(10,20);
// // number(10,20,30);
// // number(10);

// const arr = [10,20,30,40,50];
// const arr2 = [20,30,40,50,60];

// const ans = [...arr,...arr2];
// const [first,second, ...num] = arr;
// console.log(ans);
// console.log(first);
// console.log(second);
// console.log(num);


// const addNumber = function(num1,num2){
//     return num1+num2;

// }
//     console.log(addnumber(3,45));


// console.log(addnumber(3,45));
// function addnumber(num1,num2){
//     return num1+num2;

// }


// // arrow functions
// const  Number = (num1,num2) => {
//     return num1+num2;
// }
// console.log(Number(3,45));


// const greeting = ()=> {
//     return user = {
//         name : "Vivek",
//         age : 22,
//     }
// }

// console.log(greeting());

// const greet = () => ({name : "Vivek", age : 22});
// console.log(greet());

// const squarenumber = num => num*num;
// console.log(squarenumber(3));


// // IIFE Functions 

// (function helloji (){
//     console.log("Hello Ji !");
// })();


//  Call Back Functions 

// function greet (callback){
//     console.log("Hello Ji !");
//     callback();
// }

// function dance (){
//     console.log("Dance");
// }

// function meet() {
//     console.log("Kaise ho ji !");
// }
// greet(meet);
// greet(dance);

// //  Example of Call Back Functions
// function blinkit(){
//     console.log("order placed");
// }

// function zomatoOrderplaced (){
//     console.log("Order Placed");

// }

// function payment(amount, callback){
//     console.log(`${amount} payment is initialixed`)
//     console.log("payment is successfull");
//     callback();
// }

// payment(2000,zomatoOrderplaced);
// payment(1000,blinkit);
