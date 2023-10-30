
document.getElementById("post_user_btn1").addEventListener("click", postUser);

function postUser() {

    var userInputId = prompt("[1/2] 아이디를 입력하세요: ");
    var userInputPw = prompt("[2/2] 암호를 입력하세요: ");


    fetch("http://211.178.126.231/regist", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // title: "Test",
            // body: "I am testing!",
            // userId: 1,
            userId: userInputId,
            userPw: userInputPw
        }),
    }).then((response) => console.log(response))
        .then((data) => console.log(data));
}
