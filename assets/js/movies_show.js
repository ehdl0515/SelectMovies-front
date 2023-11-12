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




import {GetMoviesAllWithPage} from "./movie_api.js";
import {getPageGroup, getFirstPage, setPaging, getLastPage} from "./page.js";

let board_list_content = document.getElementById("board_list_content");
let currentPage = 0;
let numButtons = '';
let prevPage;
let nextPage;
let pageGroup;
let queryIndex;

await setPaging(currentPage)
numButtonAddEvent()
prevNextAddEvent()
pageGroup = getPageGroup(currentPage)
queryIndex = getFirstPage(pageGroup) - 1
CallFunc(queryIndex)





function numButtonAddEvent() {
    numButtons = document.querySelectorAll('span.number-button');
    console.log(numButtons)
    console.log("start numButtonAddEvent")

    numButtons.forEach((button) => {

        button.addEventListener('click', function(event) {
            event.preventDefault();
            numButtons.forEach(button => button.classList.remove('active'));
            button.classList.add('active'); // 클릭한 num 버튼에 'active' 클래스 추가
            let queryPage = button.textContent.trim() - 1
            console.log(queryPage)
            CallFunc(queryPage)
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
        queryIndex = getLastPage(pageGroup) - 1
        await setPaging(currentPage, 0)
        numButtonAddEvent()
        CallFunc(queryIndex)
        nextPage.classList.remove("disabled-element")
    });

    nextPage.addEventListener('click', async function(event) {
        event.preventDefault();
        console.log("start addEventListener")
        currentPage += 5;
        console.log("currPage: ", currentPage)
        pageGroup = getPageGroup(currentPage)
        queryIndex = getFirstPage(pageGroup) - 1
        await setPaging(currentPage)
        numButtonAddEvent()
        CallFunc(queryIndex)
        prevPage.classList.remove("disabled-element")
    });
}




// 로직 실행
async function CallFunc(index) {
    try {
        const response = await GetMoviesAllWithPage(index);
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







