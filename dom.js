// const newElement = document.createElement("h3");
// newElement.textContent = "Hello World";
// newElement.id = "third";

// console.log(newElement);
// //  select the element with id "second" and insert the new element after it
// const element =document.getElementById("second");
// // element after (New Element)
// element.after(newElement);

// const newElement2 = document.createElement("h4");
// newElement2.textContent = "Holi Arhi Hai";
// newElement2.id = "fourth";
// newElement2.classList.add("Diwali");
// newElement2.classList.add("Holi");
// newElement2.classList.remove("Diwali");
// newElement2.setAttribute("title", "Festivals");
// newElement2.style.color = "blue";
// newElement2.style.fontSize = "40px";

// console.log(newElement2.getAttribute("id"));
// console.log(newElement2.getAttribute("class"));
// console.log(newElement2.getAttribute("title"));

// // select the element with id "first" and insert the new element before it
// const element2 =document.getElementById("third");
// // element before (New Element2)
// element2.after(newElement2);

// const list = document.createElement("li");
// list.textContent = "List of Fruits";
// const list2 = document.createElement("li");
// list2.textContent = "Apple";
// // list.append(list2);
// const list3 = document.createElement("li");
// list3.textContent = "Banana";
// // list.append(list3);
// const list4 = document.createElement("li");
// list4.textContent = "Mango";
// // list.append(list4);


// const undorderedElement = document.getElementById("list");
// undorderedElement.append(list);
// undorderedElement.prepend(list3);
// list.after( list2, list3);

// console.log(undorderedElement);
// undorderedElement.children[0].after(list4);

const arr =["Milk", "Eggs", "Bread", "Butter"];
const ulElement = document.getElementById("list");
const fragment = document.createDocumentFragment();

for (let food of arr) {
    const liElement = document.createElement("li");
    liElement.textContent = food;
    fragment.append(liElement);
}
    ulElement.append(fragment);

    const s1 = document.getElementById("first");
    s1.remove();

const Year = document.getElementById("months");
// console.log(Year.childNodes);

const lister = document.createElement("li");
lister.textContent = "December","November","October";

Year.insertAdjacentElement("beforeend", lister);
