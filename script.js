
let addBtn = document.getElementById("addBtn");
let clearBtn = document.getElementById("clearBtn");
let clearBttn = document.getElementById("clearBttn");
let textArea = document.getElementById("OrderNotes");
let textArea2 = document.getElementById("OrderNotes2");
let todoList = document.getElementById("todoList");
let main = document.getElementById("main");
let editBtn = document.getElementsByClassName("Edit");
let deleteBtn = document.getElementsByClassName("Delete");
let card = document.getElementsByClassName("Card");
let modal = document.getElementsByClassName("modal")[0];
let save = document.getElementsByClassName("save")[0];
let copyClip = document.getElementsByClassName("copyClip");

let date= new Date;
let months=["Jan", "Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

let obj = {
    content: "",
    publish:``
}
if (localStorage.getItem("todo") == null) {
    localStorage.setItem("todo", "[]");
}
let todoArr = JSON.parse(localStorage.getItem("todo"));
let abc = JSON.parse(localStorage.getItem("todo"));

// showing all the notes on the Home page
for (let i = 0; i < todoArr.length; i++) {
    todoList.innerHTML += `  <div 
            class="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 innerDiv Card">
            <i class="fa-regular fa-clipboard fa-sm copyClip" title="copy"></i>
            <span
                class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

            <div class="mt-3">
                <p class="max-w-[40ch] text-sm text-gray-500 over">
                     ${JSON.parse(abc[i]).content}
                    
                </p>
            </div>

            <dl class="mt-6 flex gap-4 sm:gap-6">
                <div class="flex flex-col-reverse">
                    <dt class="text-sm font-medium text-gray-600">Published</dt>
                    <dd class="text-xs text-gray-500">${JSON.parse(abc[i]).publish}</dd>
                </div>
            </dl>

        <button
            class="group relative inline-block overflow-hidden border border-indigo-600 px-8 py-3 mt-6 Edit focus:outline-none focus:ring">
            <span
                class="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"></span>

            <span class="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white">
                Edit
            </span>
        </button>

        <button
            class="group relative inline-block overflow-hidden border border-red-600 px-8 py-3 mt-6 Delete focus:outline-none focus:ring">
            <span
                class="absolute inset-y-0 right-0 w-[2px] bg-red-600 transition-all group-hover:w-full group-active:bg-red-500"></span>

            <span class="relative text-sm font-medium text-red-600 transition-colors group-hover:text-white">
                Delete
            </span>
        </button>

        </div>`
}

// console.log(todoArr);

// adding notes in localStorage
let addCard = () => {
    if (textArea.value !== "") {
        obj.content = textArea.value
        obj.publish=`${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`
        todoArr.push(JSON.stringify(obj));
        localStorage.setItem("todo", JSON.stringify(todoArr));
        abc = JSON.parse(localStorage.getItem("todo"));
        // JSON.parse(abc[0]);
        // JSON.parse(abc[i].content)
        todoList.innerHTML = "";
        for (let i = 0; i < todoArr.length; i++) {
            todoList.innerHTML += `  <div 
            class="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 innerDiv Card">
            <i class="fa-regular fa-clipboard fa-sm copyClip" title="copy"></i>
            <span
                class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

            <div class="mt-3">
                <p class="max-w-[40ch] text-sm text-gray-500 over">
                    ${JSON.parse(abc[i]).content}
                    
                </p>
            </div>

            <dl class="mt-6 flex gap-4 sm:gap-6">
                <div class="flex flex-col-reverse">
                    <dt class="text-sm font-medium text-gray-600">Published</dt>
                    <dd class="text-xs text-gray-500">${JSON.parse(abc[i]).publish}</dd>
                </div>
            </dl>

        <button
            class="group relative inline-block overflow-hidden border border-indigo-600 px-8 py-3 mt-6 Edit focus:outline-none focus:ring">
            <span
                class="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"></span>

            <span class="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white">
                Edit
            </span>
        </button>

        <button
            class="group relative inline-block overflow-hidden border border-red-600 px-8 py-3 mt-6 Delete focus:outline-none focus:ring">
            <span
                class="absolute inset-y-0 right-0 w-[2px] bg-red-600 transition-all group-hover:w-full group-active:bg-red-500"></span>

            <span class="relative text-sm font-medium text-red-600 transition-colors group-hover:text-white">
                Delete
            </span>
        </button>

        </div>`
        }

    }
    textArea.value = "";
    // obj.content=textArea.value;

    // on click delete button after adding Notes
    for (let i = 0; i < todoArr.length; i++) {
        deleteBtn[i].onclick = () => {
            todoArr.splice(i, 1);
            localStorage.setItem("todo", JSON.stringify(todoArr));
            card[i].remove();
            window.location.reload();
        }
    }

    // on click edit button after adding the notes
    let editIndex = -1;
    for (let i = 0; i < todoArr.length; i++) {
        editBtn[i].onclick = () => {
            console.log("k")
            main.style.display = "none"
            todoList.style.display = "none"
            modal.style.display = "block"
            editIndex = i;
            textArea2.value = JSON.parse(todoArr[editIndex]).content;
        }
    }

    // for copy on clipboard
    for(let i=0; i<todoArr.length; i++){
        copyClip[i].onclick=()=>{
            copyClip[i].style.color="blue"
            copyClip[i].setAttribute("title", "Copied")
            for(let j=0; j<i; j++){
                copyClip[j].style.color=""  
                copyClip[j].setAttribute("title", "Copy")
            }
            for(let k=i+1; k<todoArr.length; k++){
                copyClip[k].style.color="" 
                copyClip[k].setAttribute("title", "Copy") 
            }
            let copyText=JSON.parse(abc[i]).content;
            // copyText.setSelectionRange(0,99999); // for mobile
            navigator.clipboard.writeText(copyText);
        }
    }
}

// on click delete button of the home page notes.
for (let i = 0; i < todoArr.length; i++) {
    deleteBtn[i].onclick = () => {
        card[i].remove();
        todoArr.splice(i, 1);
        localStorage.setItem("todo", JSON.stringify(todoArr));
        window.location.reload();
    }
}

// on click edit button of the home page notes.
let editIndex = -1;
for (let i = 0; i < todoArr.length; i++) {
    editBtn[i].onclick = () => {
        main.style.display = "none"
        todoList.style.display = "none"
        modal.style.display = "block"
        editIndex = i;
        textArea2.value = JSON.parse(todoArr[editIndex]).content;
    }
}

// for copy on clipboard
for(let i=0; i<todoArr.length; i++){
    copyClip[i].onclick=()=>{
        copyClip[i].style.color="blue"
        copyClip[i].setAttribute("title", "Copied")
        for(let j=0; j<i; j++){
            copyClip[j].style.color=""  
            copyClip[j].setAttribute("title", "Copy")
        }
        for(let k=i+1; k<todoArr.length; k++){
            copyClip[k].style.color=""  
            copyClip[k].setAttribute("title", "Copy")
        }
        let copyText=JSON.parse(abc[i]).content;
        navigator.clipboard.writeText(copyText);
    }
}

let clear = () => {
    textArea.value = "";
}
let clear2 = () => {
    textArea2.value = "";
}

// on click save button after clicking on edit button
let sav = () => {
    if(textArea2.value!=""){
        obj.content = textArea2.value;
        obj.publish=`${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`
        todoArr.splice(editIndex, 1, JSON.stringify(obj));
        localStorage.setItem("todo", JSON.stringify(todoArr));
    }
    window.location.reload();
}
addBtn.addEventListener("click", addCard);
clearBtn.addEventListener("click", clear);
clearBttn.addEventListener("click", clear2);
save.addEventListener("click", sav);