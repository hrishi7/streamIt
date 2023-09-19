
const notAvailable = 'N/A';
let title='';
let searchTitle ='';

function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location.href = 'singleTv.html';
  // window.location.href = `/search-results?query=${encodeURIComponent(query)}`;

  return false;
}

function scrollToResult(result) {
  if (result) {
      result.scrollIntoView({ behavior: "smooth" });
  }
}




function getMovie(){
  let movieId = sessionStorage.getItem('movieId');

  axios.get('https://api.themoviedb.org/3/tv/'+movieId+'?api_key=ca5d667528ca51e527d9e4f7830d97d2&language=en-US')
  .then((response) =>{
    console.log(response);
    let movie = response.data;
    let output =`
      <div class="row">
        ${!movie.poster_path ?

      `
      <div class="col-md-4">
         <img class="img-fluid" src="img/no-poster.gif" alt="${movie.title}">
       </div>

        `:`
          <div class="col-md-4">
            <img class="img-fluid" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
          </div>
          `
      }

        <div class="col-md-8">
          <h2>${movie.original_name}</h2>
            <ul class="list-group">
              ${!movie.first_air_date?
                `
                <li class="list-group-item"><strong>Released On:</strong>${notAvailable}</li>
                `:`
              <li class="list-group-item"><strong>Released On:</strong> ${movie.first_air_date}</li>
              `
            }
            ${!movie.genres[0].name?
              `
              <li class="list-group-item"><strong>Rated:</strong>${notAvailable}</li>
              `:`
            <li class="list-group-item"><strong>Rated:</strong> ${movie.genres[0].name}</li>
            `
          }
          ${!movie.created_by[0].name?
            `
            <li class="list-group-item"><strong>Tagline:</strong>${notAvailable}</li>
            `:`
          <li class="list-group-item"><strong>Tagline:</strong> ${movie.created_by[0].name}</li>
          `
        }
        ${!movie.production_companies[0].name?
          `
          <li class="list-group-item"><strong>production Companies:</strong>${notAvailable}</li>
          `:`
        <li class="list-group-item"><strong>production Companies:</strong> ${movie.production_companies[0].name}</li>
        `
      }
      ${!movie.origin_country[0]?
        `
        <li class="list-group-item"><strong>production Country:</strong>${notAvailable}</li>
        `:`
      <li class="list-group-item"><strong>production Country:</strong> ${movie.origin_country[0]}</li>
      `
    }

            </ul>
        </div>
      </div>
      <div class="row">
        <div class="well">
          <h3>Plot</h3>
            ${!movie.overview?notAvailable:movie.overview}

          <br><br>
            <a class="btn btn-default" target="_blank" href='https://openloadmovies.tv/tvseries/${title = encodeURIComponent(movie.original_name).replace(/%20/g, "-")}'>Watch It</a>
            <a href="tv.html" clas="btn btn-default">Go back to search</a>

        </div>
      </div>
      <br>
    `;
    if (output) {
      // Scroll to the search result
      scrollToResult(output);
  } 
    $('#movie').html(output);
  })
  .catch((err) =>{
    console.log(err);
  });

}
