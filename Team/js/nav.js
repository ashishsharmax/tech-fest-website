let bars = document.getElementById("nav-action");
let nav = document.getElementById("customNav");
let count = 0;

$(document).ready(() => {
    if ((window.location.hash === "") ) {
        if ($(window).width() <= 768) {
            $(".bars").show();
            $("#customNav").show();
//            $(".front_nav").hide();
        } else {
//            $(".front_nav").show();
            $(".bars").show(); 	
            $("#customNav").show();
        }
    } else {
//        $(".front_nav").hide();
        $(".bars").show();
        $("#customNav").show();
    }
    $("#customNav li").each(() => {
        count += 1;
    });
    $("#customNav a").click(() => {
        bars.classList.toggle('active');
        nav.classList.toggle('visible');
    });

    $(window).on('hashchange', function (e) {
        navChange();
    });
});

$(window).on('hashchange', function (e) {
    navChange();
});

function navChange() {
    if (window.location.hash === "") {
        if ($(window).width() <= 768) {
//            $(".front_nav").hide();
            $(".bars").show();
            $("#customNav").show();
        } else {
//            $(".front_nav").show();
            $(".bars").show();
            $("#customNav").show();
        }
    } else {
//        $(".front_nav").hide();
        $(".bars").show();
        $("#customNav").show();
    }

}

$(window).resize(() => {
    navChange();
    barClicked();
    bars.addEventListener("click", navToggle, false);
});

bars.addEventListener("click", navToggle, false);

function navToggle() {
    bars.classList.toggle('active');
    nav.classList.toggle('visible');
    barClicked();
}

//setting up the clicked Effect
function barClicked() {
    var windiag = Math.sqrt(Math.pow($(window).innerHeight(), 2) + Math.pow($(window).innerWidth(), 2));
    for (let index = 1; index <= count; index++) {
        var diagonal = ((count - index + 1) / count) * windiag;
        $("nav.visible li:nth-child(" + index + ")").css({
            'width': 2 * diagonal,
            'height': 2 * diagonal,
            'top': (-1) * diagonal,
            'right': (-1) * diagonal
        });

        $("nav.visible .navText:nth-child(" + index + ")").css({
            'bottom': (((count - index + 1) / count) - (1 / (2.5 * count))) * $(window).innerHeight(),
            'left': (((count - index + 1) / count) - (1 / (1 * count))) * $(window).innerWidth(),
            'position': 'fixed',
        })
    }
}

