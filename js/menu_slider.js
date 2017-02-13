$(document).ready(function () {
    $(document).on("scroll", onScroll);
    //smoothscroll
    $('.menu_links').on('click','a', function (e) {
        if($("#mySidenav").css("height")!="0px") {
            closeNav();
        }
        e.preventDefault();
        $(document).off("scroll");
        $('.menu_links li').each(function () {
            $(this).removeClass('active_menu');
        });
            if ($("#mySidenav").css("height")=="0px"){
                 $(this).closest("li").addClass('active_menu');
            }
        var target = this.hash,
            menu = target;
         $target = $(target);
        $('html, body').stop().animate({scrollTop: $target.offset().top-$("#primary-menu").height()}, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });
    //$("#slideshow > div:gt(0)").hide();

    // setInterval(function() {
    //     $('#slideshow > div:first')
    //         .fadeOut(0)
    //         .next()
    //         .fadeIn(0)
    //         .end()
    //         .appendTo('#slideshow');
    // }, 5000);
    $('[data-toggle="modal"]').click(function () {
        document.getElementById("no_scroll").style.overflow="hidden";
    });
    $('.modal').on('hide.bs.modal', function () {
        document.getElementById("no_scroll").style.overflow="auto";
    })
});

function onScroll(event){
    var scrollPos = $(document).scrollTop()+$("#primary-menu").height();
    $('.menu_links li').each(function () {
        var currLink = $(this).children("a");
        var refElement = $(currLink.attr("href"));
            if (refElement.position().top-$("#primary-menu").height() <= scrollPos &&(refElement.height()-2*$("#primary-menu").height())+refElement.position().top +$("#primary-menu").height() > scrollPos ) {
                    $('.menu-center li').removeClass("active_menu");
                     if ($("#mySidenav").css("height")=="0px"){
                         currLink.closest("li").addClass("active_menu");
                     }
            }
            else{
                currLink.closest("li").removeClass("active_menu");
            }
    });
}
function openNav() {
    $('.menu_links li').each(function () {
        $(this).removeClass('active_menu');
    });
    document.getElementById("mySidenav").style.height = "100%";
    document.getElementById("menu_open").style.visibility="hidden";
    document.getElementById("menu_close").style.visibility="visible";
    document.getElementById("mySidenav").style.padding= "43px  53px  43px 53px";
    document.getElementById("no_scroll").style.overflow="hidden";
}
function closeNav() {
    document.getElementById("mySidenav").style.height = "0";
    document.getElementById("menu_open").style.visibility="visible";
    document.getElementById("menu_close").style.visibility="hidden";
    document.getElementById("mySidenav").style.padding="0";
    document.getElementById("no_scroll").style.overflow="auto";
}
