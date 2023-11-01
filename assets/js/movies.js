window.onload = function () {

    let el = document.getElementById("movies_list_1");

    el.onclick = MoveMovieListPage;

}
let movie_title = document.getElementById("movie_title");

movie = GetMoviesOneById(19820019);

console.log(movie);
const movie_obj = JSON.parse(movie);

movie_title.textContent = movie_obj.movieNm;


function MoveMovieListPage()  {
    window.location.href = 'movies.html';

}

function GetMoviesOneById(movieCd) {
    // 211.178.126.231
    fetch("http://127.0.0.1:8080/movies/one", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(movieCd),
    }
    ).then(response => {
        if (!response.ok) {
            throw new Error("Network Connect Fail!!");
        }
        return response.json();
    }).then(data => {
        console.log(data);
    })
        .catch(error => {
            console.error("OCCUR ERROR:", error);
        });
}