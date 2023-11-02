let movie_title = document.getElementById("movie_title");

GetMoviesOneById(19820019)
    .then(async response => {
        console.log("반환된 데이터:", response);
        // let movie_obj = JSON.parse(data);
        movie_title.textContent = await response.json();
    }
).catch(error => {
    console.error("OCCUR ERROR:", error);
});




function GetMoviesOneById(movieCd) {

    // 211.178.126.231
    return fetch("http://127.0.0.1:8080/movies/one", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(movieCd),
        }
    ).then(response => {
        if (!response.ok) {
            throw new Error('Network Connect Fail!!: ' + response.status);
        }
        console.log(response.headers)
    })
        .catch(error => {
            console.error("OCCUR ERROR:", error);
        });
}