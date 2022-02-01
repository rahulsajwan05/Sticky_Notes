// if ('serviceWorker' in navigator) {
    // register service worker
//     navigator.serviceWorker.register('service-worker.js');
//   }

let count = Number(window.localStorage.getItem("count"));
if(!count)
{
    window.localStorage.setItem("count", "0")
}

function createNote(noteTitle, noteContent) {
    // console.log(count);
    document.getElementById("no-notes").classList.add("hidden");

    let li = document.createElement("li");
    let a = document.createElement("a");
    let xbutton = document.createElement("button");
    let h2 = document.createElement("h2");
    let p = document.createElement("p");
    let editBtn = document.createElement("button");

    xbutton.classList.add("delete");
    editBtn.classList.add("edit");


    let xText = document.createTextNode("x")
    let editText = document.createTextNode("Edit")
    let h2Text = document.createTextNode(noteTitle);
    let pText = document.createTextNode(noteContent);

    h2.appendChild(h2Text);
    xbutton.appendChild(xText);
    p.appendChild(pText);
    editBtn.appendChild(editText);

    editBtn.setAttribute('data-toggle','modal');
    editBtn.setAttribute('data-target','#myModel');

    a.appendChild(h2);
    a.appendChild(xbutton);
    a.appendChild(p);
    a.appendChild(editBtn);
    a.setAttribute("href", "#");

    li.appendChild(a);

    document.querySelector("#notes").appendChild(li);
  

};


function createNoteFromInput(e) {
    e.preventDefault();
    let noteTitle = document.querySelector("#titleInput").value;
    let noteContent = document.querySelector("#contentInput").value;

    document.querySelector("#titleInput").value = "";
    document.querySelector("#contentInput").value = "";
    // console.log(noteTitle , noteContent)

    count+=1
    window.localStorage.setItem("count",count);
    
    while (window.localStorage.getItem(noteTitle))
    {
        noteTitle+= "-1";
    }
    window.localStorage.setItem(noteTitle, noteContent)
    createNote(noteTitle, noteContent);
}

function removeNotes(e) {
    if (e.target.classList.contains("delete")) {
        // console.log(count);
        let li = e.target.parentElement.parentElement;
        // console.log(li)
        let ul = document.getElementById("notes");
        // console.log(ul) 
        ul.removeChild(li);
   
        count -= 1;
        window.localStorage.setItem("count", count)
    }
    window.localStorage.removeItem(e.target.previousElementSibling.innerText);
    if (count < 1) {
        document.getElementById("no-notes").className = "";
    }
}

function editNotes(e) {

    let titles=e.target.previousElementSibling.previousElementSibling.textContent;
    let content=e.target.previousElementSibling.textContent;

    document.getElementById('title').value=titles;
    document.getElementById('description').value=content;
}

function update(e) {
    // e.preventDefault();

    let modelTitles = document.getElementById('title').value;
    let modelContent = document.getElementById('description').value;

    window.localStorage.setItem(modelTitles, modelContent);

    location.reload();

}

for( i=0 ;i<count+1;i++ ) {
    let noteTitle = window.localStorage.key(i);
    let noteContent = window.localStorage.getItem(noteTitle)

    if(noteTitle !== "count" && noteTitle) {
        createNote(noteTitle, noteContent);
    }
}

document.getElementById("inputForm").addEventListener("submit", createNoteFromInput, false);
document.getElementById("notes").addEventListener("click", removeNotes, false);
document.getElementById("notes").addEventListener("click", editNotes, false);
// document.querySelector(".modal-body").addEventListener("button", update, false);
