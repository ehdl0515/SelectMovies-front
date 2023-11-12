export async function GetMoviesAll() {
    const params = {
        genreId: 9,
    };
    const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');

    return fetch(`http://211.178.126.231/movies/count/all?${queryString}`, {
        // return fetch(`http://127.0.0.1:8080/movies/count/all?${queryString}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    )
}

export async function GetMoviesAllWithPage(page) {
    const params = {
        page: page,
        genreId: 9,
    };

// URL 에 파라미터를 추가합니다.
    const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    // 211.178.126.231
        return fetch(`http://211.178.126.231/movies?${queryString}`, {
    // return fetch(`http://127.0.0.1:8080/movies?${queryString}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    )
}