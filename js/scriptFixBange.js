document.addEventListener("DOMContentLoaded", function () {
    const submitForm = document.getElementById("inputBook");
    const searchSubmit = document.getElementById("searchBook");
    const spanSubmitForm = document.querySelector("#inputBook span");
    const completeCheckbox = document.getElementById("inputBookIsComplete");
  
    submitForm.addEventListener("submit", function (event) {
      event.preventDefault();
      addBook();
    });
  
    searchSubmit.addEventListener("submit", function (event) {
      event.preventDefault();
      searchBooks();
    });
  
    completeCheckbox.addEventListener("change", function () {
      spanSubmitForm.innerText = "";
      if (this.checked) {
        spanSubmitForm.innerText = "Selesai dibaca";
      } else {
        spanSubmitForm.innerText = "Belum selesai dibaca";
      }
    });
  
    if (isStorageExist()) {
      loadDataFromStorage();
    }
  });

function addBook() {
    const textTitle = document.getElementById("inputBookTitle").value;
    const textAuthor = document.getElementById("inputBookAuthor").value;
    const textYear = document.getElementById("inputBookYear").value;
    const isCompleted = document.getElementById("inputBookIsComplete").checked;
      
    const generateID = generateId();
    const bookObject = generateBookObject(generateID, textTitle, textAuthor, textYear, isCompleted);
      
    books.push(bookObject);
  
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function generateId() {
    return +new Date();
}

function generateBookObject(id, title, author, year, isCompleted) {
    return { 
        id, 
        title, 
        author, 
        year, 
        isCompleted 
    };
}

let books = [];
const RENDER_EVENT = "render-book";

document.addEventListener(SAVED_EVENT, function () {
    console.log(localStorage.getItem(STORAGE_KEY));
});

function makeBook(bookObject) {
    const textTitle = document.createElement("h3");
    textTitle.innerText = bookObject.title;
  
    const textAuthor = document.createElement("p");
    textAuthor.innerText = `Penulis: ${bookObject.author}`;
  
    const textYear = document.createElement("p");
    textYear.innerText = `Tahun: ${bookObject.year}`;
  
    const article = document.createElement("article");
    article.classList.add("book_item");
    article.append(textTitle, textAuthor, textYear);
    article.setAttribute("id", `${bookObject.id}`);
  
    const undoButton = document.createElement("button");
    undoButton.classList.add("green");
  
    if (bookObject.isCompleted) {
      undoButton.innerText = "Belum selesai dibaca";
      undoButton.addEventListener("click", function () {
        undoBookFromCompleted(bookObject.id);
      });
    } else {
      undoButton.innerText = "Selesai dibaca";
      undoButton.addEventListener("click", function () {
        addBookToCompleted(bookObject.id);
      });
    }

document.addEventListener(RENDER_EVENT, function () {
    const uncompletedBookList = document.getElementById("incompleteBookshelfList");
    uncompletedBookList.innerText = "";
      
    const completedBookList = document.getElementById("completeBookshelfList");
    completedBookList.innerText = "";
      
    for (const bookItem of books) {
          const bookElement = makeBook(bookItem);
          if (!bookItem.isCompleted) uncompletedBookList.append(bookElement);
          else completedBookList.append(bookElement);
        }
    });

    
