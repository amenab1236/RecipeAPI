const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = "";

var APP_ID = config.API_ID;
var APP_key = config.API_key;

//When the form is submited gets the input value
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  fetchAPI();
});

//An asynchronous function to fetch data from the API
async function fetchAPI() {
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=20`;
  const response = await fetch(baseURL);
  const data = await response.json();
  generateHTML(data.hits);
}

//Generate the markup for data received from the API
function generateHTML(results) {
  container.classList.remove("initial");
  let generatedHTML = "";
  results.map((result) => {
    generatedHTML += `
      <div class="recipe-box">
        <img src="${result.recipe.image}" alt="img">
        <a class="view-btn" target="_blank" href="${
          result.recipe.url
        }">View Recipe</a>
        <h2 class="title">${result.recipe.label}</h2>
        <div class="recipe-info">
          <p>Calories: ${result.recipe.calories.toFixed(2)}</p>
          <p>Diet label: ${
            result.recipe.dietLabels.length > 0
              ? result.recipe.dietLabels
              : "No Data Found"
          } </p>
          <p>Health labels: ${result.recipe.healthLabels}</p>
        </div>
      </div>
    `;
  });
  searchResultDiv.innerHTML = generatedHTML;
}
