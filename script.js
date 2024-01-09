// Constants
const API_Key = "kJ7595srAn946V6Hm6W_E731V8YTihqb1AmbGlCcx9U";
const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-results");
const showMoreButtonEl = document.getElementById("show-more-button");
let inputData = "";
let page = 1;

// Functions
async function searchImages() {
  inputData = searchInputEl.value;
  const API_URL = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${API_Key}`;

  //   Fetch the Response
  const response = await fetch(API_URL);

  //   Convert the response into JSON
  const data = await response.json();
  if (page === 1) {
    searchResultsEl.innerHTML = "";
  }
  //   Array of the data
  const results = data.results;

  //   Map through the array
  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    // Append to existing DOM
    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResultsEl.appendChild(imageWrapper);
  });

  // Increase the page number
  page++;
  if (page > 1) {
    showMoreButtonEl.style.display = "block";
  }
}

// Event Listeners
// Submit Event
formEl.addEventListener("submit", (event) => {
  page = 1;
  event.preventDefault();
  searchImages();
});

// Show more button
showMoreButtonEl.addEventListener("click", () => {
  searchImages();
});
