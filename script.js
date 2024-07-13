const myLibrary=[];

function Book(author, title, pages, status){
    this.author=author;
    this.title=title;
    this.pages=pages;
    this.status=status;
}

Book.prototype.changeStats = function(){
    this.status=!this.status
    displayBook();
}

function toggleRead(row){
    const index = row.parentNode.parentNode.rowIndex;
    myLibrary[index-1].changeStats();
}

function displayBook(){
    let library=document.querySelector(".library");
    library.innerHTML="";
    let display = document.createElement("table");
    display.innerHTML=`
    <tr>
        <th>Author</th>
        <th>Title</th>
        <th>Pages</th>
        <th>Status</th>
    </tr>`
    ;
    library.appendChild(display)
    for (let i=0;i<myLibrary.length;i++){
        let book= myLibrary[i];
        let list=document.createElement("tr")
        list.innerHTML=`
        <td>${book.author}</td>
        <td>${book.title}</td>
        <td>${book.pages}</td>
        <td>${book.status ? "Read": "Not Read Yet"}</td>
        <td><button onclick="deleteRow(this)">Del</button></td>
        <td><button onclick="toggleRead(this)">Change</button></td>`;
        display.appendChild(list);
    }
}

function deleteRow(row){
    const table = row.parentNode.parentNode.parentNode
    const index = row.parentNode.parentNode.rowIndex
    table.deleteRow(index)
    myLibrary.splice((index-1),1)
}

function addBookToLibrary(){
    let author = document.getElementById("author").value;
    let title = document.getElementById("title").value;
    let pages = document.getElementById("pages").value;
    let status = document.getElementById("status").checked;

    let newBook = new Book(author, title, pages, status)
    myLibrary.push(newBook)
    displayBook();
}

const new_btn = document.querySelector(".new-book")
const form = document.querySelector(".book-form")

new_btn.addEventListener("click",()=>{
    form.style.display="block"
})

form.addEventListener("submit",(event)=>{
    event.preventDefault();
    addBookToLibrary();
})