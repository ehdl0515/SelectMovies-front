import {UpdateMovieList, GetTotalDataCnt} from "./movies_show.js";
import {DataCntPerPage, requestParams, getTotalPageCount, setPaging} from "./page.js";



let new_filter_html;
let requestObj = {};
let colNm = ""
let filterIds;

makeFilterDiv()
addEventFilterClick()
addEventFilter()







const MoviesGenre = {
    RepGenreNmsRomance: 1,
    RepGenreNmsDocumentary: 2,
    RepGenreNmsDrama: 3,
    RepGenreNmsHorror: 4,
    RepGenreNmsAction: 5,
    RepGenreNmsComedy: 6,
    RepGenreNmsSF: 7,
    RepGenreNmsThriller: 8,
    RepGenreNmsErotic: 9,
    RepGenreNmsAdventure: 10,
    RepGenreNmsMystery: 11,
    RepGenreNmsMiscellaneous: 12,
    RepGenreNmsAnimation: 13,
    RepGenreNmsMusical: 14,
    RepGenreNmsCrime: 15,
    RepGenreNmsFamily: 16,
    RepGenreNmsWar: 17,
    RepGenreNmsFantasy: 18,
    RepGenreNmsWestern: 19,
    RepGenreNmsHistorical: 20,
    RepGenreNmsPerformance: 21,
    RepGenreNmsUndecided: 22,
}

const MoviesPrdtStat = {
    PrdtStatNmPreProd: "촬영준비",
    PrdtStatNmInProd: "촬영진행",
    PrdtStatNmPostProd: "후반작업",
    PrdtStatNmReadyForRelease: "개봉준비",
    PrdtStatNmSchedRelease: "개봉예정",
    PrdtStatNmReleased: "개봉",
    PrdtStatNmMiscellaneous: "기타",
    PrdtStatNmUndecided: "",
}

const MoviesTypeNm = {
    typeNmShortFilm: "단편",
    typeNmFeatureFilm: "장편",
    typeNmOmnibus: "옴니버스",
    typeNmOnlineExclusive: "온라인전용",
    typeNmMiscellaneous: "기타",
    typeNmUndecided: "",
}


/**
 * 필터기능에 대한 html을 추가한다. TODO. 반복문을 사용하도록 변경필요
 */
function makeFilterDiv() {
    new_filter_html = `
        <div>
            <label id="filterTypeNms" class="filter-label">유형</label>
                <div id="filterTypeNms" class="filter-content">
                    <label for="filterTypeNms">전체</label>
                    <input id="typeNmAll" type="checkbox" class="sortCheckboxTypeNms" checked>
                    <label for="filterTypeNms">단편</label>
                    <input id="typeNmShortFilm" type="checkbox" class="sortCheckboxTypeNms">
                    <label for="filterTypeNms">장편</label>
                    <input id="typeNmFeatureFilm" type="checkbox" class="sortCheckboxTypeNms">
                    <label for="filterTypeNms">옴니버스</label>
                    <input id="typeNmOmnibus" type="checkbox" class="sortCheckboxTypeNms">
                    <label for="filterTypeNms">온라인전용</label>
                    <input id="typeNmOnlineExclusive" type="checkbox" class="sortCheckboxTypeNms">
                    <label for="filterTypeNms">기타</label>
                    <input id="typeNmMiscellaneous" type="checkbox" class="sortCheckboxTypeNms">
                    <label for="filterTypeNms">미정</label>
                    <input id="typeNmUndecided" type="checkbox" class="sortCheckboxTypeNms">
                </div>
        </div>
        <div>
            <label id="filterPrdtStatNms" class="filter-label">제작상태</label>
                <div id="filterPrdtStatNms" class="filter-content">
                    <label for="filterPrdtStatNms">전체</label>
                    <input id="PrdtStatNmAll" type="checkbox" class="sortCheckboxPrdtStatNms" checked>
                    <label for="filterPrdtStatNms">촬영준비</label>
                    <input id="PrdtStatNmPreProd" type="checkbox" class="sortCheckboxPrdtStatNms">
                    <label for="filterPrdtStatNms">촬영진행</label>
                    <input id="PrdtStatNmInProd" type="checkbox" class="sortCheckboxPrdtStatNms">
                    <label for="filterPrdtStatNms">후반작업</label>
                    <input id="PrdtStatNmPostProd" type="checkbox" class="sortCheckboxPrdtStatNms">
                    <label for="filterPrdtStatNms">개봉준비</label>
                    <input id="PrdtStatNmReadyForRelease" type="checkbox" class="sortCheckboxPrdtStatNms">
                    <label for="filterPrdtStatNms">개봉예정</label>
                    <input id="PrdtStatNmSchedRelease" type="checkbox" class="sortCheckboxPrdtStatNms">
                    <label for="filterPrdtStatNms">개봉</label>
                    <input id="PrdtStatNmReleased" type="checkbox" class="sortCheckboxPrdtStatNms">
                    <label for="filterPrdtStatNms">기타</label>
                    <input id="PrdtStatNmMiscellaneous" type="checkbox" class="sortCheckboxPrdtStatNms">
                    <label for="filterPrdtStatNms">미정</label>
                    <input id="PrdtStatNmUndecided" type="checkbox" class="sortCheckboxPrdtStatNms">
                </div>
        </div>
        <div>
            <label id="filterRepGenreNms" class="filter-label">장르</label>
                
                <div id="filterRepGenreNms" class="filter-content">
                    <label for="filterRepGenreNms">전체</label>
                    <input id="RepGenreNmsAll" type="checkbox" class="sortCheckboxRepGenreNms" checked>
                    <label for="filterRepGenreNms">멜로/로맨스</label>
                    <input id="RepGenreNmsRomance" type="checkbox" class="sortCheckboxRepGenreNms">
                    <label for="filterRepGenreNms">다큐멘터리</label>
                    <input id="RepGenreNmsDocumentary" type="checkbox" class="sortCheckboxRepGenreNms">
                    <label for="filterRepGenreNms">드라마</label>
                    <input id="RepGenreNmsDrama" type="checkbox" class="sortCheckboxRepGenreNms">
                    <label for="filterRepGenreNms">액션</label>
                    <input id="RepGenreNmsAction" type="checkbox" class="sortCheckboxRepGenreNms">
                    <label for="filterRepGenreNms">미스테리</label>
                    <input id="RepGenreNmsMystery" type="checkbox" class="sortCheckboxRepGenreNms">
                    <label class="line-break"></label>
                    <label for="filterRepGenreNms">판타지</label>
                    <input id="RepGenreNmsFantasy" type="checkbox" class="sortCheckboxRepGenreNms">
                    <label for="filterRepGenreNms">공포(호러)</label>
                    <input id="RepGenreNmsHorror" type="checkbox" class="sortCheckboxRepGenreNms">
                    <label for="filterRepGenreNms">스릴러</label>
                    <input id="RepGenreNmsThriller" type="checkbox" class="sortCheckboxRepGenreNms">                    
                    <label for="filterRepGenreNms">코미디</label>
                    <input id="RepGenreNmsComedy" type="checkbox" class="sortCheckboxRepGenreNms">
                    <label for="filterRepGenreNms">성인물(에로)</label>
                    <input id="RepGenreNmsErotic" type="checkbox" class="sortCheckboxRepGenreNms">
                    <label for="filterRepGenreNms">가족</label>
                    <input id="RepGenreNmsFamily" type="checkbox" class="sortCheckboxRepGenreNms">
                    <label class="line-break"></label>
                    <label for="filterRepGenreNms">사극</label>
                    <input id="RepGenreNmsHistorical" type="checkbox" class="sortCheckboxRepGenreNms">                   
                    <label for="filterRepGenreNms">SF</label>
                    <input id="RepGenreNmsSF" type="checkbox" class="sortCheckboxRepGenreNms">
                    <label for="filterRepGenreNms">범죄</label>
                    <input id="RepGenreNmsCrime" type="checkbox" class="sortCheckboxRepGenreNms">                    
                    <label for="filterRepGenreNms">전쟁</label>
                    <input id="RepGenreNmsWar" type="checkbox" class="sortCheckboxRepGenreNms">
                    <label for="filterRepGenreNms">애니메이션</label>
                    <input id="RepGenreNmsAnimation" type="checkbox" class="sortCheckboxRepGenreNms">
                    <label for="filterRepGenreNms">뮤지컬</label>
                    <input id="RepGenreNmsMusical" type="checkbox" class="sortCheckboxRepGenreNms">
                    <label for="filterRepGenreNms">어드벤쳐</label>
                    <input id="RepGenreNmsAdventure" type="checkbox" class="sortCheckboxRepGenreNms">    
                    <label class="line-break"></label>
                    <label for="filterRepGenreNms">서부극(웨스턴)</label>
                    <input id="RepGenreNmsWestern" type="checkbox" class="sortCheckboxRepGenreNms">
                    <label for="filterRepGenreNms">공연</label>
                    <input id="RepGenreNmsPerformance" type="checkbox" class="sortCheckboxRepGenreNms">                        
                    <label for="filterRepGenreNms">기타</label>
                    <input id="RepGenreNmsMiscellaneous" type="checkbox" class="sortCheckboxRepGenreNms">
                    <label for="filterRepGenreNms">미정</label>
                    <input id="RepGenreNmsUndecided" type="checkbox" class="sortCheckboxRepGenreNms">
                </div>
        </div>
        <div class="call">
            <button id="refreshBtn" class="refresh">조건 초기화</button>
            <button id="executeBtn" class="execute">조건으로 조회</button>
        </div>
        `

    let filter_container = document.createElement("div");
    filter_container.innerHTML = new_filter_html;
    filter_container.classList.add("filter-container")

    let filter = document.getElementById("filter");
    filter.classList.add("toggleDiv")
    filter.appendChild(filter_container);
}


/**
 * 필터 수행버튼에 대한 이벤트를 추가한다.
 */
function addEventFilter() {
    const refreshElem = document.getElementById("refreshBtn");
    console.log("refreshElem: ", refreshElem)
    refreshElem.addEventListener('click', handleRefreshFilter);

    const executeElem = document.getElementById("executeBtn");
    console.log("executeElem: ", executeElem)
    executeElem.addEventListener('click', handleExecuteFilter);

    const filterToggleElem = document.getElementById("filterToggle");
    console.log("filterToggleElem: ", filterToggleElem)
    filterToggleElem.addEventListener('click', toggleVisibility);
}

/**
 * 필터 체크박스에 대한 로직. TODO. 정의값을 API 를 통해 가져오도록 변경필요
 * @param allId
 * @param id
 * @returns {(function(*): void)|*}
 */
function handleCheckboxClick(allId, id) {
    return function(event) {
        let indexToRemove;
        let data = "";
        let match = id.match(/sortCheckbox(.*)/);
        if (match) {
            colNm = match[1];
        }

        console.log("colNm: ", colNm);

        if (!requestObj.hasOwnProperty(colNm)) {
            requestObj[colNm] = [];
        }

        // 전체 체크박스 선택자
        const allCheckbox = document.getElementById(allId);
        // 현재 클릭한 체크박스
        console.log("allcheckobox:", allCheckbox);
        const clickedCheckbox = event.target;
        console.log("clickedCheckbox:", clickedCheckbox);


        // "전체" 체크박스를 클릭한 경우
        if (clickedCheckbox === allCheckbox) {
            const checkboxes = document.querySelectorAll(id);
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
                allCheckbox.checked = true;
            });
            requestObj[colNm] = [];
        } else {
            // "전체" 체크박스가 아닌 다른 체크박스를 클릭한 경우
            const allCheckbox = document.getElementById(allId);
            allCheckbox.checked = false;

            if (colNm === "RepGenreNms") {
                data = MoviesGenre[clickedCheckbox.id]
            } else if (colNm === "PrdtStatNms") {
                data = MoviesPrdtStat[clickedCheckbox.id]
            } else if (colNm === "TypeNms") {
                data = MoviesTypeNm[clickedCheckbox.id]
            }

            if (clickedCheckbox.checked) {
                requestObj[colNm].push(data);
                console.log("after click check: requestObj: ", requestObj);
            } else {
                indexToRemove = requestObj[colNm].indexOf(data);
                if (indexToRemove !== -1) {
                    requestObj[colNm].splice(indexToRemove, 1);
                }
                console.log("after click uncheck: requestObj: ", requestObj);

            }

            // 모든 체크박스가 체크되어 있는지 확인
            const allChecked = [...document.querySelectorAll(id)]
                .every(checkbox => checkbox.checked);

            // 만약 모든 체크박스가 체크되어 있다면 "전체" 체크박스를 체크
            if (allChecked) {
                allCheckbox.checked = true;
                requestObj[colNm] = [];
            }
        }
        console.log("[handleCheckboxClick] requestObj: ", requestObj);
    }
}

/**
 * 필터 조건 초기화에 대한 로직.
 * @param event
 */
function handleRefreshFilter(event) {
        // 전체 체크박스 선택자
    filterIds.forEach(ids => {
        const allCheckbox = document.getElementById(ids[0]);
        const checkboxes = document.querySelectorAll(ids[1]);
        console.log("allCheckbox: ", allCheckbox)
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        })
        allCheckbox.checked = true;
    })
    requestObj = {}
    console.log("[handleRefreshFilter] requestObj: ", requestObj);

}

/**
 * 필터 조건 조회에 대한 로직
 * @param event
 * @returns {Promise<void>}
 */
async function handleExecuteFilter(event) {
    console.log("[handleExecuteFilter] requestObj: ", requestObj);

    requestParams.prdtYearGoe = requestObj["PrdtYearGoe"] !== undefined ? requestObj["PrdtYearGoe"] : null;
    requestParams.prdtYearLoe = requestObj["PrdtYearLoe"] !== undefined ? requestObj["PrdtYearLoe"] : null;
    requestParams.openDtGoe = requestObj["OpenDtGoe"] !== undefined ? requestObj["OpenDtGoe"] : null;
    requestParams.openDtLoe = requestObj["OpenDtLoe"] !== undefined ? requestObj["OpenDtLoe"] : null;
    requestParams.typeNms = requestObj["TypeNms"] !== undefined ? requestObj["TypeNms"] : null;
    requestParams.prdtStatNms = requestObj["PrdtStatNms"] !== undefined ? requestObj["PrdtStatNms"] : null;
    requestParams.repNationNms = requestObj["RepNationNms"] !== undefined ? requestObj["RepNationNms"] : null;
    requestParams.genreIds = requestObj["RepGenreNms"] !== undefined ? requestObj["RepGenreNms"] : null;
    requestParams.page = 0;
    requestParams.size = DataCntPerPage;
    requestParams.sortColumn = null;
    requestParams.sortDesc = null;
    console.log("[handleExecuteFilter] requestParams: ", requestParams);

    let totalPage = getTotalPageCount(await GetTotalDataCnt(requestParams));
    await setPaging(totalPage)
    // page = getFirstPage()
    await UpdateMovieList(requestParams)
}


/**
 * 토글에 대한 기능 로직
 */
function toggleVisibility() {
    let filterDiv = document.getElementById("filter");
    let filterToggle = document.getElementById("filterToggle");

    // 현재 가시성 상태 확인
    let isVisible = parseInt(window.getComputedStyle(filterDiv).maxHeight, 10) > 0;

    if (isVisible) {
        filterDiv.style.transition = "max-height 0.3s ease-out";
        filterDiv.style.maxHeight = "0";
        filterToggle.textContent = "검색필터 열기";
    } else {
        filterDiv.style.transition = "max-height 0.3s ease-in-out";
        filterDiv.style.maxHeight = filterDiv.scrollHeight + "px";
        filterToggle.textContent = "검색필터 닫기";
    }
}

/**
 * 필터 체크박스 클릭에 대한 이벤트를 추가한다.
 */
function addEventFilterClick() {
    filterIds = [["typeNmAll", ".sortCheckboxTypeNms"], ["PrdtStatNmAll", ".sortCheckboxPrdtStatNms"], ["RepGenreNmsAll", ".sortCheckboxRepGenreNms"]]

    filterIds.forEach(ids => {
        const checkboxes = document.querySelectorAll(ids[1]);
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('click', handleCheckboxClick(ids[0], ids[1]));
        });
    })
}




