import {GetMoviesAll} from './movie_api.js';


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

export const DataCntPerPage = 10;
const showPageCnt = 5;


const totalPage = getTotalPageCount(await GetTotalDataCnt(requestParams));
let prevPage = document.getElementById("prev_page");
let nextPage = document.getElementById("next_page");
let numberButtonWrapper = document.querySelector('.number-button-wrapper');


async function GetTotalDataCnt(requestParams) {
    const response = await GetMoviesAll(requestParams);
    if (!response.ok) {
        throw new Error('Network Connect Fail!!: ' + response.status);
    }
    console.log(response)
    let totalDataCnt = await response.json();
    console.log("totalDataCnt: ", totalDataCnt.length)
    return totalDataCnt.length;
}




function getTotalPageCount(totalDataCnt1) {
    return Math.ceil( totalDataCnt1 / DataCntPerPage);
}

export function getPageGroup(currentPage) {
    return Math.ceil(currentPage / showPageCnt);
}

export function getFirstPage(pageGroup) {
    return (pageGroup * showPageCnt) + 1;
}

export function getLastPage(pageGroup) {

    let result = pageGroup * showPageCnt;
    if (result >= totalPage) {
        result = totalPage;
    } else if (result < totalPage) {
        if ((totalPage - result) > showPageCnt) {
            result += showPageCnt;
        } else {
            result += (totalPage % showPageCnt)
        }
    }
    return result;
}



export async function setPaging(currentPage, condition=1) {

    // const totalPage = getTotalPageCount(93);
    const pageGroup = getPageGroup(currentPage);

    let last = getLastPage(pageGroup);
    let first = getFirstPage(pageGroup);

    const next = last + 1;
    const prev = first - 1;

    if (totalPage < 1) {
        first = last;
    }

    console.log("totalPage: ", totalPage)
    console.log("pageGroup: ", pageGroup)
    console.log("first: ", first)
    console.log("last: ", last)
    console.log("prev: ", prev)
    console.log("next: ", next)

    let newHtml = "";

    if (condition === 1) {
        for (let j = first; j <= last; j++) {
            if (j === first) {
                newHtml += `<span class="number-button active"> ${j} </span>`
            } else if (currentPage === j) {
                newHtml += `<span class="number-button"> ${j} </span>`
            } else if (j > 0 ) {
                newHtml += `<span class="number-button"> ${j} </span>`
            }
        }
    }
    else if (condition === 0) {
        for (let j = first; j <= last; j++) {
            if (j === last) {
                newHtml += `<span class="number-button active"> ${j} </span>`
            } else if (currentPage === j) {
                newHtml += `<span class="number-button"> ${j} </span>`
            } else if (j > 0 ) {
                newHtml += `<span class="number-button"> ${j} </span>`
            }
        }

    }


    numberButtonWrapper.innerHTML = '';
    numberButtonWrapper.innerHTML = newHtml;
    console.log("innerHTML", numberButtonWrapper.innerHTML)


    if (currentPage <= showPageCnt) {
        prevPage.classList.add("disabled-element")
    }

    if ((totalPage <= showPageCnt || last === totalPage))  {
        nextPage.classList.add("disabled-element")

    }




}





