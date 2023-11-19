export async function GetMoviesAll(requestParams) {

    const defaultParams = {
        prdtYearGoe: null,
        prdtYearLoe: null,
        openDtGoe: null,
        openDtLoe: null,
        typeNms: null,
        prdtStatNms: null,
        repNationNms: null,
        genreIds: null,
    };

    const params = { ...defaultParams, ...requestParams };
    Object.keys(params).forEach(key => params[key] === null && delete params[key]);

    const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');

    return fetch(`http://211.178.126.231/movies?${queryString}`, {
        // return fetch(`http://127.0.0.1:8080/movies?${queryString}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    )
}

export async function GetMoviesAllWithPage(requestParams) {

    const defaultParams = {
        prdtYearGoe: null,
        prdtYearLoe: null,
        openDtGoe: null,
        openDtLoe: null,
        typeNms: null,
        prdtStatNms: null,
        repNationNms: null,
        genreIds: null,
        page: 0, // 기본 페이지 값
        size: 10, // 기본 크기 값
        sortColumn: null,
        sortDesc: null,
    };


    const params = { ...defaultParams, ...requestParams };
    Object.keys(params).forEach(key => params[key] === null && delete params[key]);

// URL 에 파라미터를 추가합니다.
    const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    // 211.178.126.231
        return fetch(`http://211.178.126.231/movies/page?${queryString}`, {
    // return fetch(`http://127.0.0.1:8080/movies/page?${queryString}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    )
}