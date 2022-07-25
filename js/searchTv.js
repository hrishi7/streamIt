


$(document).ready(() => {
  getPopularShows();
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();

  });
});
function getPopularShows() {
  axios.get(
      "https://api.themoviedb.org/3/tv/popular?api_key=ca5d667528ca51e527d9e4f7830d97d2&language=en-US"
    )
    .then(response => {
      let shows = response.data.results;
      let output=`
      <div id="movieCarousel" class="carousel slide" data-ride="carousel" style="margin:auto;">
           
          <div class="carousel-inner">
          `
      ;
      let indices = [];
      while(indices.length!=10){
        let randomIndex = Math.floor(Math.random() * shows.length);
        if(indices.indexOf(randomIndex)==-1){
          indices.push(randomIndex);
        }
      }
      for(let i=0;i<indices.length;i++){
        let show = shows[indices[i]];
        if(i==0){
          output += `<div class="carousel-item active">`;
        }
        else{
          output += `<div class="carousel-item">`;
        }
        output += `
      <div class="col-sm-6 portfolio-item" style="margin:auto;">
        ${
          !show.poster_path
            ? `
      <a class="portfolio-link" data-toggle="modal" href="#" onclick="movieSelected('${
        show.id
      }')">
         <img class="img-fluid" src="img/no-poster.gif" alt="${show.name}">
       </a>

        `
            : `
        <a class="portfolio-link" data-toggle="modal" href="#" onclick="movieSelected('${
          show.id
        }')">
            <img class="img-fluid" src="https://image.tmdb.org/t/p/w500/${
              show.poster_path
            }" alt="${show.name}">
          </a>
          `
        }
        <div class="portfolio-caption">
          <h4 style="color:black">${show.name}</h4>
          <p class="text-muted">Released On<br/>${show.first_air_date}</p>
        <a onclick="movieSelected('${
          show.id
        }')" class="btn btn-primary" href="#">View Details</a>

        </div>
      </div>
        </div>
      `;
      }
      output += ` </div>
      <a class="carousel-control-prev" href="#movieCarousel" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#movieCarousel" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
      `
      $("#movies").html(output);
    })
    .catch(err => {
      console.log(err);
    });
}

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
          <h4 class="text-dark">${movie.name}</h4>
          <p class="text-muted">Released On<br/>${movie.first_air_date}</p>
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
