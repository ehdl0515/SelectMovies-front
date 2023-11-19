
import {GetMoviesAll, GetMoviesAllWithPage} from "./movie_api.js";
import {
    getFirstPage,
    setPaging,
    requestParams,
    getTotalPageCount,
    prevNextAddEvent
} from "./page.js";


const board_list_content = document.getElementById("board_list_content");

// let page;

export let totalPage;

// 전체페이지 수는 1. "처음로딩", 2. "필터 조회" 일 때만 불러온다.
totalPage = getTotalPageCount(await GetTotalDataCnt(requestParams));

await setPaging(totalPage)
await prevNextAddEvent()

await UpdateMovieList(requestParams)


/**
 * API 요청 후 응답받은 영화목록 데이터의 길이(개수)를 반환
 * @param requestParams
 * @returns {Promise<*>}
 * @constructor
 */
export async function GetTotalDataCnt(requestParams) {
    const response = await GetMoviesAll(requestParams);
    if (!response.ok) {
        throw new Error('Network Connect Fail!!: ' + response.status);
    }
    console.log(response)
    let totalDataCnt = await response.json();
    console.log("totalDataCnt: ", totalDataCnt.length)
    return totalDataCnt.length;
}

/**
 * API 요청 후 응답받은 영화목록 데이터를 보여주는 html 업데이트
 * @returns void
 * @param requestParams
 */
export async function UpdateMovieList(requestParams) {

    try {
        const response = await GetMoviesAllWithPage(requestParams);
        console.log("반환된 데이터:", response);
        if (!response.ok) {
            throw new Error('Network Connect Fail!!: ' + response.status);
        }
        let data = await response.json();
        let movies = data.content;

        board_list_content.innerHTML = ''; // 기존 내용 지우기

        movies.map(function (movie) {
            let new_html = `
                <div id="movieNm"  class="movieNm">${movie.movieNm}</div>
                <div id="prdtYear" class="prdtYear">${movie.prdtYear}</div>
                <div id="openDt" class="openDt">${movie.openDt}</div>
                <div id="typeNm" class="typeNm">${movie.typeNm}</div>
                <div id="prdtStatNm" class="prdtStatNm">${movie.prdtStatNm}</div>
                <div id="repNationNm" class="repNationNm">${movie.repNationNm}</div>
                <div id="repGenreNm" class="repGenreNm">${movie.repGenreNm}</div>
                `;

            let container = document.createElement("div");
            container.innerHTML = new_html;
            board_list_content.appendChild(container);
        });
    } catch (error) {
        console.error('에러:', error);
    }
}







