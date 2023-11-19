document.addEventListener("DOMContentLoaded", function() {
    const home = document.getElementById("home");

    home.addEventListener("click", function() {
        window.location.href = "homepage.html";
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const informationAllMovies = document.getElementById("information_all_movies");

    informationAllMovies.addEventListener("click", function() {
        window.location.href = "movies.html";
    });
});

let new_html;
new_html = `
<!--        <div class="section">-->
            <div class="logo">
                <a id="home" href="#">All of Movies</a>
            </div>
            <div class="nav">
                <ul>
                    <li class="dropdown-trigger"><a href="#">Information</a>
                        <ul class="dropdown">
                            <li><a href="#">- TOP Movies</a> </li>
                            <li><a id="information_all_movies" href="#">- All Movies</a> </li>
                        </ul>
                    </li>
                    <li class="dropdown-trigger"><a href="#">Search</a>
                        <ul class="dropdown">
                            <li><a href="#">- Movie</a> </li>
                            <li><a href="#">- Actor</a> </li>
                            <li><a href="#">- Genre</a> </li>
                        </ul>
                    </li>
                    <li class="dropdown-trigger"><a href="#">Event</a>
                        <ul class="dropdown">
                            <li><a href="#">- Test</a> </li>
                        </ul>
                    </li>
                    <li class="dropdown-trigger"><a href="#">My Page</a>
                        <ul class="dropdown">
                            <li><a href="#">- Setting</a> </li>
                            <li><a href="#">- TEST2</a> </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="profile">
                <ul>
                <li><a href="#">Sign In</a> </li>
                <li><a href="#">Sign Up</a> </li>
                </ul>
            </div>
<!--        </div>-->
`;
let container = document.createElement("div");
container.innerHTML = new_html;
container.classList.add("section")

let nav_bar = document.getElementById("nav_bar");
nav_bar.appendChild(container);




document.addEventListener("DOMContentLoaded", function () {
    const sliderWrapper = document.querySelector(".slider-wrapper");
    let translateValue = 0;
    const slideWidth = document.querySelector(".slide").offsetWidth;

    function nextSlide() {
        if (translateValue > -(slideWidth * (document.querySelectorAll(".slide").length - 1))) {
            translateValue -= slideWidth;
        } else {
            translateValue = 0;
        }
        updateSlider();
    }

    function updateSlider() {
        sliderWrapper.style.transform = `translateX(${translateValue}px)`;
    }

    // 이미지를 자동으로 이동하는 주기를 설정 (여기서는 3초로 설정)
    setInterval(nextSlide, 3000);


    // 화살표 클릭 시 슬라이더 이동
    document.querySelector(".arrow-left").addEventListener("click", function () {
        if (translateValue < 0) {
            translateValue += slideWidth;
        } else {
            translateValue = -(slideWidth * (document.querySelectorAll(".slide").length - 1));
        }
        updateSlider();
    });

    document.querySelector(".arrow-right").addEventListener("click", nextSlide);

});
