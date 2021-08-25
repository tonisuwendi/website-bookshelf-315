document.addEventListener("DOMContentLoaded", function () {
  renderBook();
});

HEADER_BTN_ADDBOOK.addEventListener("click", function () {
  clearInputSubmit();
  FORM_ADD_BOOK_CONTAINER.style.display = "block";
});

BTN_CANCEL_SUBMIT_BOOK.addEventListener("click", function () {
  FORM_ADD_BOOK_CONTAINER.style.display = "none";
  clearInputSubmit();
  if (TEMP_SCROLL) {
    window.scrollTo(0, TEMP_SCROLL);
    TEMP_SCROLL = null;
  }
});

BUTTON_CANCEL_DELETE.addEventListener("click", function () {
  ALERT_DELETE_BOX.style.display = "none";
});

SUBMIT_FORM.addEventListener("submit", function (e) {
  e.preventDefault();
  const inputData = getInputSubmit(EDIT_BOOK_ID);
  if (inputData) {
    if (EDIT_BOOK_ID) {
      updateBook(inputData);
    } else {
      insertBook(inputData);
    }
    hideFormSubmit();
    if (TEMP_SCROLL) {
      window.scrollTo(0, TEMP_SCROLL);
      TEMP_SCROLL = null;
    }
  }
});

function renderBook(search = false) {
  READ_BOOK_CONTAINER.innerHTML = "";
  UNREAD_BOOK_CONTAINER.innerHTML = "";
  const books = search ? searchBook(search) : getAllBook();
  let isCompleted = 0;
  let uncompleted = 0;
  for (let book of books) {
    if (book.isCompleted) {
      isCompleted++;
      READ_BOOK_CONTAINER.append(makeBookElement(book));
    } else {
      uncompleted++;
      UNREAD_BOOK_CONTAINER.append(makeBookElement(book));
    }
  }
  if (isCompleted === 0) {
    warningBookIsEmpty(true, search);
  }
  if (uncompleted === 0) {
    warningBookIsEmpty(false, search);
  }
}

INPUT_SEARCH_BOX.addEventListener("keyup", function (e) {
  renderBook(e.target.value);
});

function hideFormSubmit() {
  clearInputSubmit();
  FORM_ADD_BOOK_CONTAINER.style.display = "none";
}

document.addEventListener("ondataloaded", function (e) {
  renderBook();
  INPUT_SEARCH_BOX.value = "";
});

function compare(a, b) {
  if (a.id > b.id) {
    return -1;
  }
  if (a.id < b.id) {
    return 1;
  }
  return 0;
}
