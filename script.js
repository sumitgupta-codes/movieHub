const movieForm = document.querySelector("#searchMovie");
const movieInput = document.querySelector("#movie-input");
const movieHub = document.querySelector("#movie-hub");
const loading = document.querySelector("#loading");
const resultCount = document.querySelector("#results-count")
movieForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let query = movieInput.value.trim();

  if (!query) {
    return;
  }

  searchMovies(query);
});

async function searchMovies(movieName) {
  //   movieHub.innerHTML = `<p>Searching Movie...</p>`;
  loading.classList.remove("hidden");
  let response = await fetch(
    `http://www.omdbapi.com/?apikey=39d48c0a&s=${movieName}`,
  );

  let data = await response.json();
  console.log(data);
  if (data.Response === "True") {
  resultCount.textContent = `${data.Search.length} movies`
    displayMovies(data.Search);
  } else {
    loading.classList.add("hidden");
    movieHub.innerHTML = `<p>${data.Error}</p>`;
  }
}

function displayMovies(movies) {
  console.log(movies);
  movieHub.innerHTML = ""
  loading.classList.add("hidden");
  
  movies.forEach((movie) => {
    const div = document.createElement("div");

    div.dataset.imdbID = movie.imdbID;
    div.setAttribute("class", "movie-card");

    div.innerHTML = `
            <article class="group bg-[#111318] rounded-2xl overflow-hidden
                 border border-white/5
                 hover:border-white/10
                 hover:-translate-y-1
                 transition-all duration-300">

                    <div class="relative aspect-[2/3] overflow-hidden bg-[#181a20]">

                        <img src=${movie.Poster} alt="Movie poster"
                            class="w-full h-full object-cover
                     group-hover:scale-105
                     transition-transform duration-500" />

                        <div class="absolute inset-0 bg-gradient-to-t
                     from-black/80 via-transparent to-transparent
                     opacity-0 group-hover:opacity-100
                     transition-opacity"></div>

                        <span class="absolute top-3 left-3 px-2.5 py-1
                     rounded-lg bg-black/70 backdrop-blur-sm
                     text-xs font-medium text-white">
                            Movie
                        </span>

                    </div>

                    <div class="p-4">

                        <h3 class="font-semibold text-sm sm:text-base
                     truncate" title=${movie.Title}>
                            ${movie.Title}
                        </h3>

                        <div class="flex items-center gap-2 mt-2 text-xs text-gray-500">
                            <span>${movie.Year}</span>

                            <span class="w-1 h-1 rounded-full bg-gray-600"></span>

                            
                        </div>

                    </div>

                </article>
        `;

    movieHub.append(div);
  });
}

movieHub.addEventListener("click", (e) => {
  e.stopPropagation();

  const movieCard = e.target.closest(".movie-card");

  const imdbID = movieCard?.dataset?.imdbID;

  location.href = `movie.html?id=${imdbID}`; // onclick redirect this page.
});