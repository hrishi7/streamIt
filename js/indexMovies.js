

$( document ).ready(function() {
  axios.get('https://api.themoviedb.org/3/discover/movie?api_key=ca5d667528ca51e527d9e4f7830d97d2&language=en-US&sort_by=popularity.desc&include_adult=false')
  .then((response) =>{
    let movies = response.data.results;
    console.log(response);
    let output ='';
    $.each(movies, (index, movie) =>{
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

      `;
    });
    $('#home-movies').html(output);
  })
  .catch((err) =>{
    console.log(err);
  });
});
