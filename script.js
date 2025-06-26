const myLibrary=[];
let bookEdit=null;
function Book(title,author,pages, read){
    this.id=crypto.randomUUID();
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read?"Read it finally":"Not Read Yet";
}

function addBookToLibrary(title ,author,pages,read){
    const book=new Book(title,author,pages,read);
    myLibrary.push(book);
    saveLibrary();
    displayBooks();
}
function deleteBook(id){
    const index=myLibrary.findIndex(book=>book.id===id);
    if(index!==-1){
        myLibrary.splice(index,1);
        saveLibrary();
    }
}
function displayBooks(){
    const container=document.querySelector('.bookContainer');
    container.innerHTML='';
    myLibrary.forEach(book=>{
        const card=document.createElement('div');
        card.className='book-card';
        card.innerHTML=`
        <h3>${book.title}</h3>
        <p><strong>Author: </strong> ${book.author}</p>
        <p><strong>Pages:</strong> ${book.pages}</p>
        <p><strong>Status:</strong> ${book.read}</p>
        `
        const buttonContainer=document.createElement('div');
        buttonContainer.classList.add('card-buttons');

        const editBtn=document.createElement('button');
        editBtn.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>book-edit</title><path d="M19.39 10.74L11 19.13V22H6C4.89 22 4 21.11 4 20V4C4 2.9 4.89 2 6 2H7V9L9.5 7.5L12 9V2H18C19.1 2 20 2.89 20 4V10.3C19.78 10.42 19.57 10.56 19.39 10.74M13 19.96V22H15.04L21.17 15.88L19.13 13.83L13 19.96M22.85 13.47L21.53 12.15C21.33 11.95 21 11.95 20.81 12.15L19.83 13.13L21.87 15.17L22.85 14.19C23.05 14 23.05 13.67 22.85 13.47Z" /></svg>`;
        editBtn.classList.add('editBtn');
        editBtn.onclick=()=>{
            editBook(book.id);
        };
        card.appendChild(editBtn);


        const deleteBtn=document.createElement('button');
        deleteBtn.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>trash-can</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" /></svg>`;
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.onclick=()=>{
            deleteBook(book.id);
            displayBooks();
        };

        buttonContainer.appendChild(editBtn);
        buttonContainer.appendChild(deleteBtn);
        card.appendChild(buttonContainer);
        container.appendChild(card);
    });
}

const formContainer=document.querySelector('.form-pop');
const overlay=document.querySelector('.overlay');
const form=document.querySelector('.form');

function openForm(){
    formContainer.style.display='block';
    overlay.style.display='block';
}

function closeForm(){
    formContainer.style.display='none';
    overlay.style.display='none';
    form.reset();
}

form.addEventListener('submit',function(e){
    e.preventDefault();
    const title=document.querySelector('#title').value;
    const author=document.querySelector('#author').value;
    const pages=document.querySelector('#page').value;
    const read=document.querySelector('#read').value==='true';
    if(!bookEdit)addBookToLibrary(title,author,pages,read);
    else{
        bookEdit.title=title;
        bookEdit.author=author;
        bookEdit.pages=pages;
        bookEdit.read=read?"Read it finally":"Not Read yet";
        saveLibrary();
        displayBooks();
        bookEdit=null;
    }
    closeForm();
})

//this is just for my satisfaction it was not on project but i want to store it so here we go

function saveLibrary() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function loadLibrary() {
  const stored = localStorage.getItem('myLibrary');
  if (stored) {
    const parsed = JSON.parse(stored);
    myLibrary.length = 0; 
    parsed.forEach(b => {
      const restoredBook = new Book(b.title, b.author, b.pages, b.read === "Read it finally");
      restoredBook.id = b.id; 
      myLibrary.push(restoredBook);
    });
    displayBooks();
  }
}

document.addEventListener('DOMContentLoaded',loadLibrary);

//making edit button for good

function editBook(id) {
  const book = myLibrary.find(b => b.id === id);
  if (!book) return;

  document.querySelector('#title').value = book.title;
  document.querySelector('#author').value = book.author;
  document.querySelector('#page').value = book.pages;
  document.querySelector('#read').value = (book.read === "Read it finally").toString();

  bookEdit = book;
  openForm();
}

