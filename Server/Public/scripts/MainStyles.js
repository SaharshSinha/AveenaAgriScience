
resizeToFitPage();
function resizeToFitPage(){
    $(".resizePageWidth").each(function(){

        $(this).css({
            width: $(window).width() - 20,
            height: $(window).height() - 20
        });
    }
    );
        
}


function resetMenuPointer(){

}

var animationQueue = [];

addScrollBarsToMainPage();

var backleafDepth = function (){
    $(".layer1").each(function (){
        var topPosition = (window.scrollY + this.offsetTop) * 1;
        $(this).offset({ top : topPosition});
    });
    $(".layer2").each(function () {
        var topPosition = (window.scrollY + this.offsetTop) * 0.5;
        $(this).offset({ top : topPosition });
    });
    $(".layer3").each(function () {
        var topPosition = (window.scrollY + this.offsetTop) * 0.1 ;
        $(this).offset({ top : topPosition });
    });
}



function resizeAndMoveLogoToPosition()
{
    $("#mainLogo").animate({
        "top" : -20,
        "left" : $(window).width() * 0.02,
        "height" : $("#mainLogo").height() / 2.5 ,
        "width" : $("#mainLogo").width() / 2.5,
        "z-index" : 100
    }, 1000);

}

function setLogoBorder(){

    $("#mainLogoBorder").css({
        "top": $("#mainLogo").position().top,
        "left": $("#mainLogo").position().left - 4,
        "height": $("#mainLogo").height() + 4,
        "width": $("#mainLogo").width() + 8
    });
    $("#mainLogoBorder").show(400);

}

function showHeaderAndFooter(){
    $("#mainNavigation").css("padding-left", (($(window).width() * 0.02) + $("#mainLogo").width()));
    $("header").show();
    $("footer").show();
    $("header").animate({
        "top": 0
    });
    $("footer").animate({
        "bottom" : 0
    });


}

function addScrollBarsToMainPage(){
    $("html").css("overflow", "auto");
}

//End UI Initiation

window.addEventListener("resize", realignSectionHeight);

window.addEventListener("scroll", scrollChores);

function scrollChores(){
    setHeaderPosition();
    moveLeaf();
}

function setHeaderPosition(){
    if ($("body").scrollTop() >= $("header").height() + $("ul").height()) {
        $(".ulContainer").css({
            top: 0,
            position: 'fixed'
        });
        
        $("#menuPointer, #menuSelected").css({
            position: 'fixed'
        });
        
        
        HomeButtonToggle("rect");

        
        
    }
    else {
        $(".ulContainer").css({
            top: $("header").height() + 'px',
            position: 'absolute'
        });
        $("#menuPointer #menuSelected").css({
            position: 'absolute'
        });
        
        
        HomeButtonToggle("round");
    }
}

function realignSectionHeight(){
    $("section").height($(window).height());
    resizeToFitPage();
}


function HomeButtonToggle(form)
{
    if (form == "rect") {
        $("#mainLogoOuter").animate({
            "margin-left": '-75px',
            "border-radius": '5px',
            "top": '0px',
            "width": '150px',
            "height": '40px'
        }, 50);

        $("#mainLogoInner").animate({
            "border-radius": '5px',
            "width": "140px",
            "height": "30px"
        }, 50);

    }
    else {
        $("#mainLogoOuter").animate({
            "margin-left": '-60px',
            "border-radius": '75px',
            "width": "120px",
            "height": "120px",
            "top": "-30px",
            position : 'absolute'
        }, 50);

        $("#mainLogoInner").animate({
            "border-radius": '75px',
            "width": "105px",
            "height": "105px"
        }, 50);
    }
}