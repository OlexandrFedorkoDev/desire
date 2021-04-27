$(function () {

    // header меню
    $('.menu__btn').on('click', function () {
        $('.rightside-menu').toggleClass('rightside-menu--active');
        $('.menu__btn-line').toggleClass('menu__btn-line--active');
    });

    if ($(window).width() < 651) {
        $('.works-path__item--measurement').appendTo($('.works-path__items-box'));
    }


    $('.top__slider').slick({
        dots: true,
        arrows: false,
        fade: true,
        autoplay: true,

    });
    $('.contact-slider').slick({
        dots: true,
        arrows: false,
        slidesToShow: 10,
        slidesToScroll: 10,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1700,
                settings: {
                    slidesToShow: 8,
                    slidesToScroll: 8,
                }
            },
            {
                breakpoint: 1511,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },
        ]

    });


    // gallery фільтр 
    $('.js-tab-trigger').on('click', function () {
        var tabName = $(this).data('tab'),
            tab = $('.js-tab-content[data-tab="' + tabName + '"]');

        $('.js-tab-trigger.active').removeClass('active');
        $(this).addClass('active');


        $('.js-tab-content.active').removeClass('active');
        tab.addClass('active');
    });



});

let comments = [];
loadComments();

document.getElementById('comment-add').onclick = function (e) {
    e.preventDefault
    let commentName = document.getElementById('comment-name');
    let commentBody = document.getElementById('comment-body');

    let comment = {
        name: commentName.value,
        body: commentBody.value,
        time: Math.floor(Date.now() / 1000)
    }

    commentName.value = '';
    commentBody.value = '';

    comments.push(comment);
    saveComments();
    showComments();
}

function saveComments() {
    localStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments() {

    if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
    showComments();
}

function showComments() {

    let commentField = document.getElementById('comment-field');
    let out = '';
    comments.forEach(function (item) {
        out += `<p class="comment__name" role="alert">${item.name}</p>`;
        out += `<p class="comment__time"><em>${timeConverter(item.time)}</em></p>`;
        out += `<p class="comment__date" role="alert">${item.body}</p>`;
    });
    commentField.innerHTML = out;
}

function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
}




