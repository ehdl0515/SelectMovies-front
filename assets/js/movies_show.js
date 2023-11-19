
import {GetMoviesAllWithPage} from "./movie_api.js";
import {getPageGroup, getFirstPage, setPaging, getLastPage, requestParams} from "./page.js";

let board_list_content = document.getElementById("board_list_content");
let currentPage = 0;
let numButtons = '';
let prevPage;
let nextPage;
let pageGroup;
export let page;

await setPaging(currentPage)
numButtonAddEvent()
prevNextAddEvent()
pageGroup = getPageGroup(currentPage)
page = getFirstPage(pageGroup) - 1




await CallFunc(requestParams)





function numButtonAddEvent() {
    numButtons = document.querySelectorAll('span.number-button');
    console.log(numButtons)
    console.log("start numButtonAddEvent")

    numButtons.forEach((button) => {

        button.addEventListener('click', async function (event) {
            event.preventDefault();
            numButtons.forEach(button => button.classList.remove('active'));
            button.classList.add('active'); // 클릭한 num 버튼에 'active' 클래스 추가
            page = button.textContent.trim() - 1
            console.log("page:", page)
            requestParams.page = page;
            await CallFunc(requestParams)
        })
    });
}



function prevNextAddEvent() {
    prevPage = document.getElementById("prev_page");
    nextPage = document.getElementById("next_page");

    prevPage.addEventListener('click', async function (event) {
        event.preventDefault();
        console.log("start addEventListener")
        currentPage -= 5;
        console.log("currPage: ", currentPage)
        pageGroup = getPageGroup(currentPage)
        page = getLastPage(pageGroup) - 1
        await setPaging(currentPage, 0)
        numButtonAddEvent()
        requestParams.page = page;
        await CallFunc(requestParams)
        nextPage.classList.remove("disabled-element")
    });

    nextPage.addEventListener('click', async function(event) {
        event.preventDefault();
        console.log("start addEventListener")
        currentPage += 5;
        console.log("currPage: ", currentPage)
        pageGroup = getPageGroup(currentPage)
        page = getFirstPage(pageGroup) - 1
        await setPaging(currentPage)
        numButtonAddEvent()
        requestParams.page = page;
        await CallFunc(requestParams)
        prevPage.classList.remove("disabled-element")
    });
}




// 로직 실행
export async function CallFunc(requestParams) {
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
            let new_html;
            new_html = `
<!--<div id="movieCd" class="movieCd">${movie.movieCd}</div>-->
                <div id="movieNm"  class="movieNm">${movie.movieNm}</div>
                <div id="prdtYear" class="prdtYear">${movie.prdtYear}</div>
                <div id="openDt" class="openDt">${movie.openDt}</div>
                <div id="typeNm" class="typeNm">${movie.typeNm}</div>
                <div id="prdtStatNm" class="prdtStatNm">${movie.prdtStatNm}</div>
                <div id="repNationNm" class="repNationNm">${movie.repNationNm}</div>
                <div id="repGenreNm" class="repGenreNm">${movie.repGenreNm}</div>`;
            let container = document.createElement("div");
            container.innerHTML = new_html;
            board_list_content.appendChild(container);
        });
    } catch (error) {
        console.error('에러:', error);
    }
}







