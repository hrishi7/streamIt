


$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();

  });
});


function getMovies(searchText){
  axios.get('https://api.themoviedb.org/3/search/tv?api_key=ca5d667528ca51e527d9e4f7830d97d2&language=en-US&query='+searchText+'&page=1')
  .then((response) =>{
    let movies = response.data.results;
    console.log(response);
    let output ='';
    if(movies.length>0){
    $.each(movies, (index, movie) =>{
      output += `
      <div class="col-md-4 col-sm-6 portfolio-item">
        ${!movie.poster_path ?

      `
      <a class="portfolio-link" data-toggle="modal" href="#" onclick="movieSelected('${movie.id}')">
         <img class="img-fluid" src="img/no-poster.gif" alt="${movie.name}">
       </a>

        `:`
        <a class="portfolio-link" data-toggle="modal" href="#" onclick="movieSelected('${movie.id}')">
            <img class="img-fluid" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.name}">
          </a>
          `
      }
        <div class="portfolio-caption">
          <h4>${movie.name}</h4>
          Released On<p class="text-muted">${movie.first_air_date}</p>
        <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">View Details</a>
        <br><br>
        </div>
      </div>

      `;
    });
    $('#movies').html(output);
  }
  else {
    output ='<h2 class="text-center">No Tv Series Available with this Name!! Please Try Another Name</h2>'
    $('#movies').html(output);
  }
  })
  .catch((err) =>{
    console.log(err);
  });
}
