function getInputSubmit(editId) {
  const title = document.getElementById("inputBookTitle").value;
  const author = document.getElementById("inputBookAuthor").value;
  const year = document.getElementById("inputBookYear").value;
  const isCompleted = document.getElementById("inputBookIsComplete").checked;
  if (isNaN(year)) {
    document.getElementById("inputBookYear").value = "";
    return alert("Tahun harus bertipe angka");
  }
  if (editId) {
    return { id: editId, title, author, year, isCompleted };
  }
  const bookObject = composeBookObject(title, author, year, isCompleted);
  return bookObject;
}

function clearInputSubmit() {
  document.getElementById("inputBookTitle").value = "";
  document.getElementById("inputBookAuthor").value = "";
  document.getElementById("inputBookYear").value = "";
  document.getElementById("inputBookIsComplete").checked = false;
  TITLE_FORM_SUBMIT_BOOK.innerText = "Tambah Buku Baru";
  BUTTON_FORM_SUBMIT_BOOK.value = "Masukan Buku";
  EDIT_BOOK_ID = null;
}

function makeBookElement(data) {
  const textTitle = document.createElement("strong");
  textTitle.classList.add("title");
  textTitle.innerText = data.title;

  const textAuthor = document.createElement("p");
  textAuthor.classList.add("author");
  textAuthor.innerText = `Penulis: ${data.author}`;

  const textYear = document.createElement("p");
  textYear.classList.add("year");
  textYear.style.marginBottom = "10px";
  textYear.innerText = `Tahun: ${data.year}`;

  const itemContainer = document.createElement("div");
  itemContainer.classList.add("list-book-item", "form-button", "shadow");
  itemContainer.append(textTitle, textAuthor, textYear);

  if (data.isCompleted) {
    itemContainer.append(
      createReadButton(data.id, true),
      editBookButton(data.id),
      deleteBookButton(data.id)
    );
  } else {
    itemContainer.append(
      createReadButton(data.id, false),
      editBookButton(data.id),
      deleteBookButton(data.id)
    );
  }

  return itemContainer;
}

function createButton(buttonClass, text, eventListener) {
  const button = document.createElement("button");
  button.innerText = text;
  button.classList.add("button", buttonClass);
  button.addEventListener("click", function (e) {
    eventListener(e);
  });
  return button;
}

function createReadButton(id, isRead) {
  return createButton(
    "button-primary",
    isRead ? "Belum Selesai Dibaca" : "Selesai Dibaca",
    function () {
      updateIsCompleted(id);
    }
  );
}

function editBookButton(id) {
  return createButton("button-success", "Edit", function () {
    const book = findById(id);
    makeFormEdit(book);
  });
}

function deleteBookButton(id) {
  return createButton("button-danger", "Hapus", function () {
    showModalAlert(id);
    INPUT_SEARCH_BOX.value = "";
  });
}

function showModalAlert(id) {
  const book = findById(id);
  ALERT_DELETE_BOX.style.display = "block";
  document.getElementById(
    "contentAlertDelete"
  ).innerHTML = `Yakin ingin menghapus buku dengan judul
  <strong>${book.title}</strong> yang ditulis oleh
  <strong>${book.author}</strong> pada tahun <strong>${book.year}</strong>?`;
  document
    .getElementById("buttonAgreeAlertDelete")
    .addEventListener("click", function () {
      deleteBook(id);
      renderBook();
      ALERT_DELETE_BOX.style.display = "none";
    });
}

function warningBookIsEmpty(isCompleted, isSearch = "") {
  const listContent = document.createElement("div");
  listContent.classList.add(
    "list-book-item",
    "warning-book-is-empty",
    "shadow"
  );

  const textContent = document.createElement("p");
  textContent.style.color = "orange";
  textContent.innerHTML = isSearch
    ? `Tidak ada hasil pencarian untuk kata <strong>${isSearch}</strong>`
    : isCompleted
    ? "Belum ada daftar buku yang selesai dibaca. Yuk lebih rajin lagi dalam membaca!"
    : "Belum ada daftar buku yang belum dibaca. Yuk tambah buku baru sekarang!";

  listContent.append(textContent);

  if (isCompleted) {
    READ_BOOK_CONTAINER.append(listContent);
  } else {
    UNREAD_BOOK_CONTAINER.append(listContent);
  }
}

function makeFormEdit(data) {
  const scroll = window.pageYOffset || document.documentElement.scrollTop;
  TEMP_SCROLL = scroll;
  window.scrollTo(0, 0);
  FORM_ADD_BOOK_CONTAINER.style.display = "block";
  TITLE_FORM_SUBMIT_BOOK.innerText = "Edit Buku";
  BUTTON_FORM_SUBMIT_BOOK.value = "Edit Buku";
  EDIT_BOOK_ID = data.id;
  document.getElementById("inputBookTitle").value = data.title;
  document.getElementById("inputBookAuthor").value = data.author;
  document.getElementById("inputBookYear").value = data.year;
  document.getElementById("inputBookIsComplete").checked = data.isCompleted;
}
