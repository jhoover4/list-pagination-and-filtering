/******************************************
 Treehouse Techdegree:
 FSJS project 2 - List Filter and Pagination
 ******************************************/

const studentItems = document.querySelectorAll(".student-item");
const itemsPerPage = 10;

/**
 * Hides all of the items in the list except for the ten you want to show.
 *
 * @param {NodeListOf<Element>} list - Represents the actual list of students that you’ll pass in as an argument later when you call this function.
 * @param page - Represents the page number that you’ll pass in as an argument later when you call this function.
 */
const showPage = (list, page) => {
  let startIndex = page * itemsPerPage - itemsPerPage;

  let maxStudents = studentItems.length;
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
 * @param {NodeListOf<Element>} list - Represents the actual list of students that you’ll pass in as an argument later when you call this function.
 */
const appendPageLinks = list => {
  const containerDiv = document.createElement("div");
  containerDiv.className = "pagination";
  containerDiv.appendChild(document.createElement("ul"));

  const paginationLinks = [];

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

  document.body.appendChild(containerDiv);
  addSelectedClass(paginationLinks, 1);
};

/**
 * Adds selected class to current page number.
 *
 * @param {Array<Element>} paginationLinks
 * @param {Number} pageNumber
 */
const addSelectedClass = (paginationLinks, pageNumber) => {
  for (let linkEl of paginationLinks) {
    linkEl.firstChild.className = "";
  }

  paginationLinks[pageNumber - 1].firstChild.className = "active";
};

// Initialize
appendPageLinks(studentItems);
showPage(studentItems, 1);
