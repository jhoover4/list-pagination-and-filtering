/******************************************
 Treehouse Techdegree:
 FSJS project 2 - List Filter and Pagination
 ******************************************/

const studentItems = document.querySelectorAll(".student-item");
const itemsPerPage = 10;

/**
 * Hides all of the items in the list except for the ten you want to show.
 *
 * @param {Array<Element> | NodeListOf<Element>} list - Represents the actual list of students that you’ll pass in as an
 * argument later when you call this function.
 * @param page - Represents the page number that you’ll pass in as an argument later when you call this function.
 */
const showPage = (list, page) => {
  let startIndex = page * itemsPerPage - itemsPerPage;

  let maxStudents = list.length;
  let endIndex = Math.min(page * itemsPerPage, maxStudents);

  for (let listEl of list) {
    listEl.style.display = "none";
  }

  for (let i = startIndex; i < endIndex; i++) {
    list[i].style.display = "block";
  }
};

/**
 * Generates pagination buttons.
 *
 * @param {Array<Element> | NodeListOf<Element>} list - Represents the actual list of students that you’ll pass in as an
 * argument later when you call this function.
 */
const appendPageLinks = list => {
  const containerDiv = document.createElement("div");
  containerDiv.className = "pagination";

  createPaginationLinks(list, containerDiv);

  document.body.appendChild(containerDiv);
};

/**
 * Adds selected class to current page number.
 *
 * @param {Array<Element> | NodeListOf<Element>} paginationLinks
 * @param {Number} pageNumber
 */
const addSelectedClass = (paginationLinks, pageNumber) => {
  for (let linkEl of paginationLinks) {
    linkEl.firstChild.className = "";
  }

  paginationLinks[pageNumber - 1].firstChild.className = "active";
};

/**
 * Creates search bar for app.
 */
const addSearchBar = () => {
  const searchBarEl = document.createElement("div");
  searchBarEl.className = "student-search";

  searchBarEl.appendChild(searchBarInput());
  searchBarEl.appendChild(searchBarButton());

  document.querySelector(".page-header").appendChild(searchBarEl);
};

const searchBarInput = () => {
  const input = document.createElement("input");
  input.placeholder = "Search for students...";

  input.addEventListener("keyup", e => {
    filterStudents(studentItems, e.target.value);
  });

  return input;
};

const searchBarButton = () => {
  const button = document.createElement("button");
  button.textContent = "Search";

  button.addEventListener("click", () => {
    const searchInput = document.querySelector(".student-search input").value;
    filterStudents(studentItems, searchInput);
  });

  return button;
};

/**
 *
 * @param {Array<Element> | NodeListOf<Element>} list - Represents the actual list of students that you’ll pass in as an
 * argument later when you call this function.
 * @param {string} filterText - The text to filter on.
 */
const filterStudents = (list, filterText) => {
  for (let listEl of list) {
    listEl.style.display = "none";
  }

  const filteredList = [];
  for (let listEl of list) {
    if (listEl.textContent.includes(filterText)) {
      listEl.style.display = "block";
      filteredList.push(listEl);
    }
  }

  const containerDiv = document.querySelector(".pagination");

  createPaginationLinks(filteredList, containerDiv);
  showPage(filteredList, 1);
};

/**
 * Creates pagination links for app.
 *
 * @param {Array<Element> | NodeListOf<Element>} list - Represents the actual list of students that you’ll pass in as an
 * argument later when you call this function.
 * @param {Element} containerDiv
 */
const createPaginationLinks = (list, containerDiv) => {
  containerDiv.innerHTML = "";
  const paginationLinks = [];

  containerDiv.appendChild(document.createElement("ul"));

  const numberOfPages = Math.ceil(list.length / itemsPerPage);
  for (let i = 1; i <= numberOfPages; i++) {
    const newListItem = document.createElement("li");
    newListItem.innerHTML = `<a href="#">${i}</a>`;

    newListItem.addEventListener("click", e => {
      const pageNumber = Number.parseInt(e.target.textContent);

      addSelectedClass(paginationLinks, pageNumber);
      showPage(list, pageNumber);
    });

    containerDiv.appendChild(newListItem);
    paginationLinks.push(newListItem);
  }

  addSelectedClass(paginationLinks, 1);
};

const run = () => {
  appendPageLinks(studentItems);
  showPage(studentItems, 1);
  addSearchBar();
};
run();
