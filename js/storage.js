const KEY_STORAGE = "MY_BOOK";

function checkForStorage() {
  return typeof Storage !== undefined;
}

function composeBookObject(title, author, year, isCompleted) {
  return {
    id: +new Date(),
    title,
    author,
    year: parseInt(year),
    isCompleted,
  };
}

function getAllBook() {
  let books = JSON.parse(localStorage.getItem(KEY_STORAGE));
  if (books) {
    return books.sort(compare);
  } else {
    return [];
  }
}

function searchBook(keyword) {
  const books = getAllBook();
  let result = [];
  for (let book of books) {
    if (book.title.toLowerCase().includes(keyword.toLowerCase())) {
      result.push(book);
    }
  }
  return result.sort(compare);
}

function getIsCompletedBook(isCompleted) {
  const books = getAllBook();
  return books.filter((e) => e.isCompleted === isCompleted);
}

function insertBook(data) {
  const books = getAllBook();
  books.push(data);
  const inputData = JSON.stringify(books);
  localStorage.setItem(KEY_STORAGE, inputData);
  document.dispatchEvent(new Event("ondataloaded"));
}

function findById(id) {
  const books = getAllBook();
  return books.find((e) => e.id === id);
}

function updateIsCompleted(id) {
  const book = findById(id);
  book.id = +new Date();
  book.isCompleted = !book.isCompleted;
  deleteBook(id);
  insertBook(book);
}

function updateBook(data) {
  const book = findById(data.id);
  book.id = data.id;
  book.title = data.title;
  book.author = data.author;
  book.year = parseInt(data.year);
  book.isCompleted = data.isCompleted;
  deleteBook(data.id);
  insertBook(book);
}

function deleteBook(id) {
  const books = getAllBook();
  const data = books.filter((e) => e.id !== id);
  const fullBook = JSON.stringify(data);
  localStorage.setItem(KEY_STORAGE, fullBook);
}
