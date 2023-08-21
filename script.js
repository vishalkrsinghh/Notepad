
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
for (let i = 0; i < todoArr.length; i++) {
    todoList.innerHTML += `  <div 
            class="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 innerDiv Card">
            <span
                class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

            <div class="mt-4">
                <p class="max-w-[40ch] text-sm text-gray-500">
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
            <span
                class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

            <div class="mt-4">
                <p class="max-w-[40ch] text-sm text-gray-500">
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
    for (let i = 0; i < todoArr.length; i++) {
        deleteBtn[i].onclick = () => {
            todoArr.splice(i, 1);
            localStorage.setItem("todo", JSON.stringify(todoArr));
            card[i].remove();
            window.location.reload();
        }
    }

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
}


for (let i = 0; i < todoArr.length; i++) {
    deleteBtn[i].onclick = () => {
        card[i].remove();
        todoArr.splice(i, 1);
        localStorage.setItem("todo", JSON.stringify(todoArr));
        window.location.reload();
    }
}

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

let clear = () => {
    textArea.value = "";
}
let clear2 = () => {
    textArea2.value = "";
}

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