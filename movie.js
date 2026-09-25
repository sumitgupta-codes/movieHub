const movieDetail = document.querySelector("#movie-detail");
const loading = document.querySelector("#loading");
const params = new URLSearchParams(location.search); // use to handle parameters in url.
const imdbID = params.get("id");
if (imdbID) {
  searchMovie(imdbID.trim());
}

async function searchMovie(imdbID) {
  //   movieDetail.innerHTML = `<div class="loader"></div>`;
  loading.classList.remove("hidden");

  let response = await fetch(
    `http://www.omdbapi.com/?apikey=39d48c0a&i=${imdbID}&plot=full`,
  );

  let data = await response.json();

  if (data.Response === "True") {
    displayMovie(data);
  } else {
    loading.classList.add("hidden");
    movieDetail.innerHTML = `<p>${data.Error}</p>`;
  }
}

function displayMovie(data) {
  loading.classList.add("hidden");

  movieDetail.innerHTML = `
            <div>

                <div class="sticky top-25 aspect-[2/3] rounded-2xl overflow-hidden
                 bg-[#111318] border border-white/10
                 shadow-2xl">

                    <img id="movie-poster" src="${data.Poster}"
                        alt="Movie Poster" class="w-full h-full object-cover" />

                </div>

            </div>


            <div class="flex flex-col">



                <div>

                    <p class="text-xs uppercase tracking-[0.2em]
                   text-red-500 font-semibold mb-3">
                        Movie Details
                    </p>

                    <h1 id="movie-title" class="text-3xl sm:text-4xl lg:text-5xl
                   font-extrabold tracking-tight">
                        ${data.Title}
                    </h1>

                </div>



                <div class="flex flex-wrap items-center gap-2
                 mt-5">

                    <span id="movie-release" class="px-3 py-1.5 rounded-lg
                   bg-white/5 border border-white/10
                   text-sm text-gray-300">
                        ${data.Released}
                    </span>

                    <span id="movie-rated" class="px-3 py-1.5 rounded-lg
                   bg-white/5 border border-white/10
                   text-sm text-gray-300">
                        ${data.Rated}
                    </span>

                    <span id="movie-runtime" class="px-3 py-1.5 rounded-lg
                   bg-white/5 border border-white/10
                   text-sm text-gray-300">
                       ${data.Runtime}
                    </span>

                    <span id="movie-genre" class="px-3 py-1.5 rounded-lg
                   bg-red-500/10 border border-red-500/20
                   text-sm text-red-400">
                        ${data.Genre}
                    </span>

                </div>


                <div class="mt-7 inline-flex items-center gap-3
                 w-fit px-4 py-3 rounded-xl
                 bg-[#111318] border border-white/10">

                    <span class="text-yellow-400 text-xl">
                        ★
                    </span>

                    <div>

                        <p class="text-xs text-gray-500">
                            IMDb Rating
                        </p>

                        <p id="movie-rating" class="font-bold text-lg">
                            ${data.imdbRating}/10
                        </p>

                    </div>

                </div>



                <div class="mt-9">

                    <h2 class="text-lg font-bold mb-3">
                        Plot Overview
                    </h2>

                    <p id="movie-plot" class="text-gray-400 leading-7
                   text-sm sm:text-base max-w-4xl">
                        ${data.Plot}
                    </p>

                </div>


                <div class="grid grid-cols-1 sm:grid-cols-2
                 gap-4 mt-8">


                    <div class="p-5 rounded-xl
                   bg-[#111318]
                   border border-white/10">

                        <p class="text-xs uppercase tracking-wider
                     text-gray-500 mb-2">
                            Director
                        </p>

                        <p id="movie-director" class="font-semibold text-sm sm:text-base">
                           ${data.Director}
                        </p>

                    </div>



                    <div class="p-5 rounded-xl
                   bg-[#111318]
                   border border-white/10">

                        <p class="text-xs uppercase tracking-wider
                     text-gray-500 mb-2">
                            Writer
                        </p>

                        <p id="movie-writer" class="font-semibold text-sm sm:text-base">
                           ${data.Writer}
                        </p>

                    </div>

                </div>


                <div class="mt-4 p-5 rounded-xl
                 bg-[#111318]
                 border border-white/10">

                    <p class="text-xs uppercase tracking-wider
                   text-gray-500 mb-2">
                        Actors
                    </p>

                    <p id="movie-actors" class="font-semibold text-sm sm:text-base
                   leading-6">
                        ${data.Actors}
                    </p>

                </div>


                <div class="grid grid-cols-1 sm:grid-cols-2
                 gap-4 mt-4">


                    <div class="p-5 rounded-xl
                   bg-[#111318]
                   border border-white/10">

                        <p class="text-xs uppercase tracking-wider
                     text-gray-500 mb-2">
                            Language
                        </p>

                        <p id="movie-language" class="font-semibold text-sm sm:text-base">
                           ${data.Language}
                        </p>

                    </div>


                    <div class="p-5 rounded-xl
                   bg-[#111318]
                   border border-white/10">

                        <p class="text-xs uppercase tracking-wider
                     text-gray-500 mb-2">
                            Country
                        </p>

                        <p id="movie-country" class="font-semibold text-sm sm:text-base">
                           ${data.Country}
                        </p>

                    </div>
                </div>

                <div class="flex flex-col">

                    <div class="mt-8">

                     <a id="imdb-link" href="https://www.imdb.com/title/${data.imdbID}" target="_blank" rel="noopener noreferrer"  class="inline-flex items-center justify-center
                     gap-2 px-6 py-3.5
                     rounded-xl
                     bg-yellow-500 hover:bg-yellow-400
                     text-black font-bold
                     transition-all duration-200
                     hover:-translate-y-0.5">

                        <span class="text-lg">★</span>

                        View on IMDb

                    </a>

                </div>

            </div>`;
}
