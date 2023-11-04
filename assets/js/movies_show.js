/*
// html 객체 선언
let movie_title = document.getElementById("movie_title");


// 로직 실행
(async () => {
    const response = await GetMoviesOneById(19820019);
    console.log("반환된 데이터:", response);
    if (!response.ok) {
        throw new Error('Network Connect Fail!!: ' + response.status);
    }
    movie_data = await response.json();
    console.log("jsonify:", movie_data)
    console.log("type:", typeof(movie_data))
    movie_title.textContent = movie_data.movieNm;
})();


// 함수 정의
async function GetMoviesOneById(movieCd) {

    return fetch("http://211.178.126.231/movies/one", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        }
    )
}

let movie_cd = document.getElementById("movieCd");
let movie_nm = document.getElementById("movieNm");
let prdt_year = document.getElementById("prdtYear");
let open_dt = document.getElementById("openDt");
let type_nm = document.getElementById("typeNm");
let prdt_stat_nm = document.getElementById("prdtStatNm");
let rep_nation_nm = document.getElementById("repNationNm");
let rep_genre_nm = document.getElementById("repGenreNm");
*/

let board_list_main = document.getElementById("board_list_main");



// 로직 실행
(async () => {
    const response = await GetMoviesAll();
    console.log("반환된 데이터:", response);
    if (!response.ok) {
        throw new Error('Network Connect Fail!!: ' + response.status);
    }
    let data = await response.json();
    console.log(data);

    let movies = data.content;
    console.log(movies);

    movies.map(function (movie, i) {
        let new_html =  (
            `<div id="movieCd" class="movieCd">${movie.movieCd}</div>
                <div id="movieNm"  class="movieNm">${movie.movieNm}</div>
                <div id="prdtYear" class="prdtYear">${movie.prdtYear}</div>
                <div id="openDt" class="openDt">${movie.openDt}</div>
                <div id="typeNm" class="typeNm">${movie.typeNm}</div>
                <div id="prdtStatNm" class="prdtStatNm">${movie.prdtStatNm}</div>
                <div id="repNationNm" class="repNationNm">${movie.repNationNm}</div>
                <div id="repGenreNm" class="repGenreNm">${movie.repGenreNm}</div>`
        );
        container = document.createElement("div");
        container.innerHTML = new_html;
        board_list_main.appendChild(container);
    });

})();


async function GetMoviesAll() {

    // 211.178.126.231
    return fetch("http://211.178.126.231/movies", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    )
}