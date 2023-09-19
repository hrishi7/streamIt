let adultFlag = false;
$(document).ready(() => {
  $("#searchForm").on("submit", e => {
    let searchText = $("#searchText").val();
    adultFlag = $("input[name=adult]:checked").val();
    getMovies(searchText);
    e.preventDefault();
  }); 
});

function scrollToResult(result) {
  if (result) {
    // Scroll to the element with the id "movies" where your search results are displayed
    document.getElementById("movies").scrollIntoView({ behavior: "smooth" });
  }
}

function getMovies(searchText) {
  axios
    .get(
      "https://api.themoviedb.org/3/search/movie?api_key=ca5d667528ca51e527d9e4f7830d97d2&language=en-US&query=" +
        searchText +
        "&page=1&include_adult=" + 
        adultFlag
    )
    .then(response => {
      let movies = response.data.results;
      
      let output = "";

      if (movies.length > 0) {
        $.each(movies, (index, movie) => {
          output += `
            <div class="col-md-4 col-sm-6 portfolio-item">
              ${
                !movie.poster_path
                  ? `
              <a class="portfolio-link" data-toggle="modal" href="#" onclick="movieSelected('${
                    movie.id
                  }')">
                <img class="img-fluid" src="img/no-poster.gif" alt="${movie.title}">
              </a>
              `
                  : `
              <a class="portfolio-link" data-toggle="modal" href="#" onclick="movieSelected('${
                    movie.id
                  }')">
                <img class="img-fluid" src="https://image.tmdb.org/t/p/w500/${
                    movie.poster_path
                  }" alt="${movie.title}">
              </a>
              `
              }
              <div class="portfolio-caption">
                <h4 style="color:black">${movie.title}</h4>
                <p class="text-muted">Released On<br/>${movie.release_date}</p>
                <a onclick="movieSelected('${
                  movie.id
                }')" class="btn btn-primary" href="#">Movie Details</a>
              </div>
            </div>
          `;
        });

        // After rendering the search results, scroll to the "movies" section
        $("#movies").html(output);
        scrollToResult(document.getElementById("movies"));
      } else {
        output =
          `<h2 Id = "h2a" class="text-center">Oopsie!! We dont have ${searchText}..Please Try Something else..</h2>`;
        $("#movies").html(output);
        scrollToResult(document.getElementById("h2a"));

      }
    })
    .catch(err => {
      console.log(err);
    });
}
