import {totalPage, UpdateMovieList} from "./movies_show.js";


export const DataCntPerPage = 10;
const showPageCnt = 5;

export let currentPage = 0;
let pageGroup = 0;
let prevPageElem = document.getElementById("prev_page");
let nextPageElem = document.getElementById("next_page");
let numberButtonWrapper = document.querySelector('.number-button-wrapper');
export let requestParams = {
    prdtYearGoe: null,
    prdtYearLoe: null,
    openDtGoe: null,
    openDtLoe: null,
    typeNms: null,
    prdtStatNms: null,
    repNationNms: null,
    genreIds: null,
    page: null,
    size: null,
    sortColumn: null,
    sortDesc: null,
};


/**
 * 전체 페이지 수를 계산해 반환, 1. "처음로딩", 2. "필터 조회" 일 때만 업데이트한다.
 * @param totalDataCnt
 * @returns {number}
 */
export function getTotalPageCount(totalDataCnt) {
    return Math.ceil( totalDataCnt / DataCntPerPage);
}

/**
 * 현재 페이지그룹을 계산해 반환한다. 이전, 다음버튼으로 인해 넘어갈 때만 업데이트한다.
 * @returns {number}
 */
function setPageGroup(currentPage) {
    pageGroup = Math.ceil(currentPage / showPageCnt);
}

/**
 * 현재화면에서 첫 페이지 번호를 반환한다. 이전, 다음버튼으로 인해 넘어갈 때만 업데이트한다.
 * @returns {number}
 */
export function getFirstPage() {
    return (pageGroup * showPageCnt) + 1;
}

/**
 * 현재화면에서 마지막 페이지 번호를 반환한다. 이전, 다음버튼으로 인해 넘어갈 때만 업데이트한다.
 * @param totalPage
 * @returns {number}
 */
export function getLastPage(totalPage) {

    let result = pageGroup * showPageCnt;
    if (result >= totalPage) {
        result = totalPage;
    } else {
        if ((totalPage - result) > showPageCnt) {
            result += showPageCnt;
        } else {
            result += (totalPage % showPageCnt)
        }
    }
    return result;
}


/**
 * 현재 페이지에 대한 정보를 업데이트한다. 이전, 다음 버튼 클릭 시 호출된다.
 * @param totalPage
 * @param currentPage
 * @param condition
 * @returns {Promise<void>}
 */
export async function setPaging(totalPage, currentPage=0, condition=1) {

    setPageGroup(currentPage);

    let lastPage = getLastPage(totalPage);
    let firstPage = getFirstPage();

    let nextPage = lastPage + 1;
    let prevPage = firstPage - 1;

    if (totalPage < 1) {
        firstPage = lastPage;
    }

    console.log("[setPaging] totalPage: ", totalPage)
    console.log("[setPaging] pageGroup: ", pageGroup)
    console.log("[setPaging] firstPage: ", firstPage)
    console.log("[setPaging] lastPage: ", lastPage)
    console.log("[setPaging] prevPage: ", prevPage)
    console.log("[setPaging] nextPage: ", nextPage)

    let newHtml = "";

    if (condition === 1) {
        for (let j = firstPage; j <= lastPage; j++) {
            if (j === firstPage) {
                newHtml += `<span class="number-button active"> ${j} </span>`
            } else if (currentPage === j) {
                newHtml += `<span class="number-button"> ${j} </span>`
            } else if (j > 0 ) {
                newHtml += `<span class="number-button"> ${j} </span>`
            }
        }
    }
    else if (condition === 0) {
        for (let j = firstPage; j <= lastPage; j++) {
            if (j === lastPage) {
                newHtml += `<span class="number-button active"> ${j} </span>`
            } else if (currentPage === j) {
                newHtml += `<span class="number-button"> ${j} </span>`
            } else if (j > 0 ) {
                newHtml += `<span class="number-button"> ${j} </span>`
            }
        }

    }

    numberButtonWrapper.innerHTML = '';  // 기존 내용 지우기
    numberButtonWrapper.innerHTML = newHtml;
    console.log("[setPaging] numberButtonWrapper.innerHTML", numberButtonWrapper.innerHTML)

    // 이전, 다음 페이지 비활성화 처리
    if (prevPage <= 0) {
        prevPageElem.classList.add("disabled-element")
    }
    if ((totalPage <= showPageCnt || lastPage === totalPage))  {
        nextPageElem.classList.add("disabled-element")
    }

    // 페이지 버튼 클릭 이벤트 추가
    numButtonAddEvent()
}



/**
 * 페이지(숫자) 버튼 클릭 시 영화목록업데이트 함수 호출
 */
export function numButtonAddEvent() {
    let numButtons = document.querySelectorAll('span.number-button');
    console.log("[numButtonAddEvent] numButtons: ", numButtons)

    numButtons.forEach((button) => {

        button.addEventListener('click', async function (event) {
            event.preventDefault();
            numButtons.forEach(button => button.classList.remove('active'));
            button.classList.add('active'); // 클릭한 num 버튼에 'active' 클래스 추가

            let page = button.textContent.trim() - 1;
            console.log("[numButtonAddEvent] page:", page);
            requestParams.page = page;
            await UpdateMovieList(requestParams);
        })
    });
}

/**
 * 이전,다음 버튼 클릭 시 새로운 페이징함수, 영화목록업데이트 함수 호출
 */
export function prevNextAddEvent() {

    prevPageElem.addEventListener('click', async function (event) {
        event.preventDefault();
        currentPage -= 5;
        console.log("[addEventListener] currentPage: ", currentPage)

        let page = getLastPage(totalPage) - 1
        await setPaging(totalPage, currentPage, 0)
        requestParams.page = page;
        await UpdateMovieList(requestParams)
        nextPageElem.classList.remove("disabled-element") // 무조건 다음 페이지가 있기 때문에 활성화
    });

    nextPageElem.addEventListener('click', async function(event) {
        event.preventDefault();
        currentPage += 5;
        console.log("[addEventListener] currentPage: ", currentPage)

        let page = getFirstPage() - 1
        await setPaging(totalPage, currentPage)
        requestParams.page = page;
        await UpdateMovieList(requestParams)
        prevPageElem.classList.remove("disabled-element")  // 무조건 이전 페이지가 있기 때문에 활성화
    });
}



