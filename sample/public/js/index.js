// ajax (Web API) : callback 형태
// - JQuery X : XMLHttpRequest 
// - JQuery O : 아래와 같이 사용
// fetch (Web API) : promise 형태
// - url, payload, header, mime type 등을 정의해서 함수로 만들어 import해서 사용

$(window).on('load', function(){
    $.ajax({
        url: '/check/login',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            if(data.isLogin){
                const div_list = document.getElementsByTagName("div");
                const h1_element = document.getElementsByTagName("h1")[0];
                const remove_list = []
                for(let i = 0; i < div_list.length; i++){
                    remove_list.push(div_list[i])
                }
                remove_list.forEach(elem=>elem.remove());
                
                const $profile = document.createElement("a");
                $profile.href = "/profile";
                $profile.text = "프로필";
                const $logout = document.createElement("a");
                $logout.href = "/logout";
                $logout.text = "로그아웃";
                h1_element.after($logout);
                h1_element.after(" : ");
                h1_element.after($profile);
            }
        }
    })
})