
const notAvailable = 'N/A';

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
          <h2>${movie.original_title}</h2>
            <ul class="list-group">
              ${!movie.release_date?
                `
                <li class="list-group-item"><strong>Released On:</strong>${notAvailable}</li>
                `:`
              <li class="list-group-item"><strong>Released On:</strong> ${movie.release_date}</li>
              `
            }
            ${!movie.vote_average?
              `
              <li class="list-group-item"><strong>Rated:</strong>${notAvailable}</li>
              `:`
            <li class="list-group-item"><strong>Rated:</strong> ${movie.vote_average}</li>
            `
          }
          ${!movie.tagline?
            `
            <li class="list-group-item"><strong>Tagline:</strong>${notAvailable}</li>
            `:`
          <li class="list-group-item"><strong>Tagline:</strong> ${movie.tagline}</li>
          `
        }
        ${!movie.production_companies[0]?
          `
          <li class="list-group-item"><strong>production Companies:</strong>${notAvailable}</li>
          `:`
        <li class="list-group-item"><strong>production Companies:</strong> ${movie.production_companies[0].name}</li>
        `
      }
      ${!movie.production_countries[0]?
        `
        <li class="list-group-item"><strong>production Country:</strong>${notAvailable}</li>
        `:`
      <li class="list-group-item"><strong>production Country:</strong> ${movie.production_countries[0].name}</li>
      `
    }

            </ul>
        </div>
      </div>
      <div class="row">
        <div class="well">
          <h3>Plot</h3>
            ${!movie.overview?
              `
            ${notAvailable}
              `:`
           ${movie.overview}
            `
          }
          <hr>
            <a href ="https://imdb.com/title/${movie.imdb_id}" target ="_blank" class="btn btn-primary">View Imdb</a>
            <a href="movies.html" clas="btn btn-default">Go back to search</a>
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
