// =========== Main section =============
$(".main").style.cssText = "height: 82vh";
$(".col-3").style.cssText = "height: 82vh";
$(".col-9").style.cssText = "height: 82vh; overflow-y: scroll";

let splicedMovies = movies.splice(10, 2000);

function renderCards(allMovies) {
  // console.log(allMovies.length)
  if (allMovies.length > 0) {
    allMovies.forEach(({ title, summary, categories, imdbRating, language, youtubeId, bigThumbnail }) => {
      let category = categories.map(genre => genre)
      let newCard = createElement("div", "col", `
      <div class="card">
        <img src="${bigThumbnail}" class="card-img-top" alt="card image" />
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <ul class="card-list list-unstyled mb-2">
            ${`<li class='card-item'><strong>Film categories: </strong>   ${category}</li>`}
          </ul>
          <p><strong>Rating: </strong> ${imdbRating}</p>
          <p><strong>Film language: </strong> ${language}</p>
          <p class="card-text mb-3">
            ${summary}
          </p>
          <a href="https://www.youtube.com/embed/${youtubeId}" target="_blank" class="btn btn-info">Youtube</a>
        </div>
      </div>
    `);
      $(".row-cols-md-2").appendChild(newCard);
    });
  }
  else {
    let ErrorElement = createElement("h2", "text-center shadow rounded-1 fs-1 w-100 py-5 text-danger my-5", "Error")
    $(".row-cols-md-2").appendChild(ErrorElement)
  }
};
renderCards(splicedMovies);



// ================== Filter by film name ==================


$(".search-name").addEventListener("input", () => {
  let inputValue = $(".search-name").value.trim().toLowerCase();
  let searchedArray = [];

  function searchingFilmByName(allData) {
    allData.forEach(data => {
      let filmTitle = data.title.trim().toLowerCase();
      if (filmTitle.includes(inputValue)) {
        searchedArray.push(data)
      }
    })
    $(".row-cols-md-2").innerHTML = "";
    renderCards(searchedArray)
  }

  searchingFilmByName(splicedMovies)

});


// ====================== filter by rating ======================

$(".search-rating").addEventListener("input", () => {
  let searchedRating = $(".search-rating").value.trim().toLowerCase()

  function SearchingByRatingData(allData) {
    if (!isNaN(searchedRating)) {
      let filteredRating = allData.filter(data => searchedRating <= data.imdbRating)
      $(".row-cols-md-2").innerHTML = "";
      renderCards(filteredRating)
    }
    else {
      let ErrorElement = createElement("h2", "text-center shadow rounded-1 fs-1 w-100 py-5 text-danger my-5", "Error")
      $(".row-cols-md-2").innerHTML = ""
      $(".row-cols-md-2").appendChild(ErrorElement);
      console.log(false)
    }
  }

  SearchingByRatingData(splicedMovies)

});


// ======================= Collect category =======================

function collectCategories(allData) {
  emptyOption = [];

  allData.forEach(data => {
    data.categories.forEach(category => {
      if (!emptyOption.includes(category)) {
        emptyOption.push(category)
      }
    })
  })
  // console.log(emptyOption)
  emptyOption.forEach(category => {
    let newOption = createElement("option", "form-option", category);
    $(".form-select").appendChild(newOption)
  })

}
collectCategories(splicedMovies);


// ========================== filter category ==========================

$(".form-select").addEventListener("change", () => {
  let elValue = $(".form-select").value;
  let filteredOptionArray = [];

  function filterCategoryName(allData) {
    // console.log(allData)
    allData.forEach(data => {
      if (data.categories.includes(elValue)) {
        filteredOptionArray.push(data);
      }
    })
    $(".row-cols-md-2").innerHTML = ""
    if(elValue === "all"){
      renderCards(splicedMovies);
    }
    else{
      renderCards(filteredOptionArray);
    }

  }
  filterCategoryName(splicedMovies);
});











(function () {

  let date = new Date()
  let container = createElement("div", "container");
  let wrapper = createElement("div", "wrapper");
  let copyright = createElement("p", "text-dark fw-bold p-0 m-0", date.getFullYear());
  let author = createElement("a", "text-dark fw-bold p-0 m-0", "Navruzbek");
  author.setAttribute("href", "https://t.me/+7Qc1CMACaIViOTli")
  author.setAttribute("target", "blank")
  wrapper.appendChild(copyright);
  wrapper.appendChild(author);
  wrapper.setAttribute("class", "d-flex justify-content-between fs-4")
  container.appendChild(wrapper)
  $(".footer").appendChild(container);
  $(".footer").setAttribute("class", "bg-danger py-3")

})()
