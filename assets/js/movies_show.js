
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

    // 211.178.126.231
    return fetch("http://127.0.0.1:8080/movies/one", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(movieCd),
        }
    )


}