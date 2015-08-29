

function focusMenuItem(menuItem) {
    if (menuItem.innerHTML != '') {
        var menuTop, menuLeft, menuHeight, menuWidth;
        menuTop = $(menuItem).offset().top;
        menuLeft = $(menuItem).offset().left;
        menuHeight = $(menuItem).height();
        menuWidth = $(menuItem).width();
        
        
        //$("#menuPointer").animate({
        //    //top : menuTop,
        //    left: menuLeft,
        //    width: menuWidth,
        //    height: menuHeight
        //}, 300)
        
        //$("#menuPointerInner").animate({
        //    //top : menuTop +3 ,
        //    left: menuLeft + 3,
        //    width: menuWidth - 6,
        //    height: menuHeight - 6
        //}, 300)

    }    ;

}
function clickedMenuItem(menuItem) {
    //if (menuItem.innerHTML != '') {
    //    var menuTop, menuLeft, menuHeight, menuWidth;
    //    menuTop = $(menuItem).offset().top;
    //    menuLeft = $(menuItem).offset().left;
    //    menuHeight = $(menuItem).height();
    //    menuWidth = $(menuItem).width();
        
    //    $("#menuSelected").animate({
    //        top : $("#menuPointer").offset().top + 3,
    //        left: menuLeft + 3,
    //        width: menuWidth - 5,
    //        height: menuHeight - 5
    //    }, 300)
    //}
    
    scrollTo(menuItem);
}

function gotoHome() {
    $('html, body').animate({
        scrollTop: $("#HomeSection").offset().top
    }, 1000);
}

function scrollTo(menuItem) {
    $('html, body').animate({
        scrollTop: $("#" + menuItem.id + "Section").offset().top
    }, 1000);
}

