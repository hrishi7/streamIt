
fetch('https://api.themoviedb.org/3/discover/movie?api_key=ca5d667528ca51e527d9e4f7830d97d2&language=en-US&sort_by=popularity.desc&include_adult=false')
.then(response => response.json())
.then(data => {
    let output = '';
    let result = data.results;
    $.each(result, (index, movie) => {
         output += `
        <div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" href="#" onclick="movieSelected('${movie.id}')">
          <img class="img-fluid" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
        </a>
        <div class="portfolio-caption">
          <h4>${movie.title}</h4>
          Released On<p class="text-muted">${movie.release_date}</p>
        <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Movie Details</a>
        </div>
      </div>
`
console.log(movie);
$("#home-movies").html(output);
    });
})
.catch(error => {
  console.error(error);
});

// navbar background color changes when user scrolls
window.onscroll = function () {
    scrollFunction();
  };
  function scrollFunction() {
    if (window.scrollY > 10) {
      document.getElementById("mainNav").style.backgroundColor = "transparent";
    } else {
      document.getElementById("mainNav").style.backgroundColor = "#323033";
    } 
  }

      //function to scroll to the top when the user clicks the "goToTop" button
$('#gtp').click(function () {
document.body.scrollTop = 0;
document.documentElement.scrollTop = 0;
});