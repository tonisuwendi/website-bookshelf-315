const HEADER_BTN_ADDBOOK = document.querySelector("header .add-new-book");
const BTN_CANCEL_SUBMIT_BOOK = document.getElementById(
  "buttonCancelAddNewBook"
);
const FORM_ADD_BOOK_CONTAINER = document.querySelector(".add-book-wrapper");
const SUBMIT_FORM = document.getElementById("inputBook");
const UNREAD_BOOK_CONTAINER = document.getElementById("unreadBook");
const READ_BOOK_CONTAINER = document.getElementById("readBook");
const ALERT_DELETE_BOX = document.getElementById("alertDelete");
const BUTTON_CANCEL_DELETE = document.getElementById("buttonCancelAlertDelete");
const INPUT_SEARCH_BOX = document.getElementById("inputSearchBox");
const BUTTON_FORM_SUBMIT_BOOK = document.getElementById("buttonSubmitBook");
const TITLE_FORM_SUBMIT_BOOK = document.getElementById("titleAddNewBook");
let EDIT_BOOK_ID = null;
let TEMP_SCROLL = null;
