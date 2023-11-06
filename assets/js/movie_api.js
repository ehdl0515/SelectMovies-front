export async function GetMoviesAll() {
    // 211.178.126.231
    return fetch("http://211.178.126.231/movies/all", {
    // return fetch("http://127.0.0.1:8080/movies/all", {
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
    };

// URL 에 파라미터를 추가합니다.
    const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    // 211.178.126.231
    // return fetch(`http://127.0.0.1:8080/movies?${queryString}`, {
        return fetch(`http://211.178.126.231/movies?${queryString}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    )
}