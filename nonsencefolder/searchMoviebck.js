$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    //let encodedSearchText = encodeURIComponent(searchText);
    //console.log(encodedSearchText);
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText){
  axios.get('https://api.themoviedb.org/3/discover/movie?api_key=ca5d667528ca51e527d9e4f7830d97d2&language=en-US&sort_by=popularity.desc&include_adult=false')
  .then((response) =>{
    let movies = response.data.results;
    console.log(response);
    let output ='';
    $.each(movies, (index, movie) =>{
      output += `
      <div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" href="#" onclick="movieSelected('${movie.id}')">
          <img class="img-fluid" src="http://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
        </a>
        <div class="portfolio-caption">
          <h4>${movie.title}</h4>
          Released On<p class="text-muted">${movie.release_date}</p>
        <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Movie Details</a>
        </div>
      </div>

      `;
    });
    $('#movies').html(output);
  })
  .catch((err) =>{
    console.log(err);
  });
}


function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'singleMovie.html';
  return false;
}



function getMovie(){
  let movieId = sessionStorage.getItem('movieId');

  axios.get('https://api.themoviedb.org/3/movie/'+movieId+'?api_key=ca5d667528ca51e527d9e4f7830d97d2&include_adult=false')
  .then((response) =>{
    console.log(response);
    let movie = response.data;
    let output =`
      <div class="row">
        <div class="col-md-4">
          <img src ="http://image.tmdb.org/t/p/w500/${movie.poster_path}" class="thumbnail">
        </div>

        <div class="col-md-8">
          <h2>${movie.original_title}</h2>
            <ul class="list-group">

              <li class="list-group-item"><strong>Released:</strong> ${movie.release_date}</li>
              <li class="list-group-item"><strong>Rated:</strong> ${movie.vote_average} / 10</li>
              <li class="list-group-item"><strong>Tagline:</strong> ${movie.tagline}</li>

            </ul>
        </div>
      </div>
      <div class="row">
        <div class="well">
          <h3>Plot</h3>
          ${movie.overview}
          <hr>
            <a href ="http://imdb.com/title/${movie.imdb_id}" target ="_blank" class="btn btn-primary">View Imdb</a>
            <a href="index.html" clas="btn btn-default">Go back to search</a>
        </div>
      </div>
      <br>
      <div class="row">
        <div class="conatiner">
        <iframe src="https://videospider.in/getvideo?key=Gbk0l1UNDHK7Uz9S&video_id=${movie.imdb_id}" width="1000" height="700" frameborder="0" allowfullscreen="true" scrolling="no"></iframe>
        </div>
      </div>


    `;
    $('#movie').html(output);
  })
  .catch((err) =>{
    console.log(err);
  });

}
