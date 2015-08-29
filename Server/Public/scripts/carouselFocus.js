/*
 *  Copyright:  Saharsh Sinha 
 *  Carousel that creates a moving image slide show that changes focus to the foreground text.
 *  It's too awesome to explain in words.....please visit this site to view it in action : saharshsinha.com\brews
 *  
 * Needs jquery before this file is included in HTML
 *
 * */

///First things first...global variables within scope.

"use strict";

var carouselWindow = $(".carouselMainWindow");
var carouselImages = $(".carouselFrame");
var carouselOverlays = $(".carouselOverlay");

var animationSpeed = {
    slideSpeed : 750,
    displayDuration : 5000,
    startFocusAfter : 2000,
    zoomDuration : 4250,
    focusIn : 750
};

setCarouselDimension();

var quadrantPositions = {
    one : {
        left: carouselWindow.offset().left,
        top: carouselWindow.offset().top
    },
    two : {
        left: carouselWindow.width() / 2.5,
        top: carouselWindow.offset().top
    },
    three : {
        left: carouselWindow.width() / 2.5,
        top: carouselWindow.height() / 2.5
    },
    four : {
        left: carouselWindow.offset().left,
        top: carouselWindow.height() / 2.5
    }


}

var cssConfigurations = {
    animate: {
        imageFrame : {
            startPosition : {
                "left": $(carouselWindow).position().left + $(carouselWindow).width() + 5,
                "top": carouselWindow.offset().top ,
                "-webkit-filter": "blur(0px)",
                "height" : $(this).height(), // carouselWindow.height(),
                "width" : carouselWindow.width()
            },

            enter: {
                "left": carouselWindow.offset().left,
                "top": carouselWindow.offset().top ,
                "-webkit-filter": "blur(0px)",
                "height" : $(this).height(), //carouselWindow.height(),
                "width" : carouselWindow.width()
            },

            zoomTo : {
                "left": carouselWindow.offset().left - 20,
                "top": carouselWindow.offset().top  - 20,
                "-webkit-filter": "blur(0px)",
                "height" : ($(this).width() * 1.1), //(carouselWindow.height() * 1.1),
                "width" : (carouselWindow.width()  * 1.1)
            },

            fromBlur : {
                "blurRadius" : 0
            },

            toBlur : {
                "blurRadius" : 10
            },

            leaveTo : {
                "left": "-" + carouselWindow.width() ,
                "top": carouselWindow.offset().top ,
                "-webkit-filter": "blur(20px)",
                "height" : $(this).height(), //(carouselWindow.height() ),
                "width" : (carouselWindow.width()  )
            }
        },

        imageOverlay : {
            startPosition : {
                "left": $(carouselWindow).position().left + $(carouselWindow).width() + 5,
                "top": carouselWindow.offset().top ,
                "-webkit-filter": "blur(5px)",
                "height" : carouselWindow.height()/2.5,
                "width" : carouselWindow.width() / 2.5
            },

            enter: {
                "left": carouselWindow.offset().left/2,
                "top": carouselWindow.offset().top/2 ,
                "height" : (carouselWindow.height()/2.5),
                "width" : (carouselWindow.width() /2.5)
            },

            zoomTo : {
                "left": carouselWindow.offset().left + randomBetween(-20, 20),
                "top": carouselWindow.offset().top + randomBetween(-20, 20),
                "height" : ((carouselWindow.height()/2.5) * 1.1),
                "width" : ((carouselWindow.width() /2.5) * 1.1)
            },
            fromBlur : {
                "blurRadius" : 5
            },
            toBlur : {
                "blurRadius" : 0
            },
            leaveTo : {
                "left": "-" + carouselWindow.width() ,
                "top": carouselWindow.offset().top ,
                "height" : (carouselWindow.height() / 2.5),
                "width" : (carouselWindow.width() / 2.5)
            }
        }

    }
};

//Master functions
var nextFrameIndex = 0;
setInterval(function () { slideNextFrame(); }, animationSpeed.displayDuration);

function slideNextFrame(){
    
    var currFrame = carouselImages[nextFrameIndex % carouselImages.length ];
    var nextFrame = carouselImages[(nextFrameIndex + 1) % carouselImages.length];
    
    frameCycle(currFrame, nextFrame, cssConfigurations.animate.imageFrame);
    
    var currOverlay = carouselOverlays[nextFrameIndex % carouselOverlays.length ];
    var nextOverlay = carouselOverlays[(nextFrameIndex + 1) % carouselOverlays.length];
    
    frameCycle(currOverlay, nextOverlay, cssConfigurations.animate.imageOverlay);

    nextFrameIndex++;
}

function frameCycle(currFrameElement, nextFrameElement, cssConfigObject){
    moveFrameOut(currFrameElement, cssConfigObject);
    initiateFrame(nextFrameElement, cssConfigObject);
    moveFrameIn(nextFrameElement, cssConfigObject);
    zoomFrame(nextFrameElement, cssConfigObject);
    blurFrame(animationSpeed.startFocusAfter, nextFrameElement, cssConfigObject.fromBlur, cssConfigObject.toBlur, animationSpeed.focusIn);
}

function initiateFrame(frame, cssConfigObject){
    var localCssConfigObject = $.extend({}, cssConfigObject);
    var magnifyBy = 1;
    if ($(frame).data('quadrant')) {
        magnifyBy = 0.5;
    }
    localCssConfigObject.startPosition.height = framePositionDimension(frame, magnifyBy).height;
    localCssConfigObject.startPosition.width = framePositionDimension(frame, magnifyBy).width;
    $(frame).css(cssConfigObject.startPosition);
}

function zoomFrame(frame, cssConfigObject) {
    var localCssConfigObject = $.extend({}, cssConfigObject);
    var magnifyBy = 1.1;
    if ($(frame).data('quadrant')) {
        localCssConfigObject.zoomTo.left = getOverlay($(frame).data("quadrant")).left + randomBetween(-40, 40);
        localCssConfigObject.zoomTo.top = getOverlay($(frame).data("quadrant")).top + randomBetween(-40, 40);
        magnifyBy = 0.55;
    }
    localCssConfigObject.zoomTo.height = framePositionDimension(frame, magnifyBy).height;
    localCssConfigObject.zoomTo.width = framePositionDimension(frame, magnifyBy).width;
    $(frame).animate(localCssConfigObject.zoomTo, animationSpeed.zoomDuration);
}

function moveFrameOut(frame, cssConfigObject){
    var localCssConfigObject = $.extend({}, cssConfigObject);
    var magnifyBy = 1;
    if ($(frame).data('quadrant')) {
        magnifyBy = 0.5;
    } 
    localCssConfigObject.leaveTo.height = framePositionDimension(frame, magnifyBy).height;
    localCssConfigObject.leaveTo.width = framePositionDimension(frame, magnifyBy).width;

    $(frame).animate(localCssConfigObject.leaveTo, animationSpeed.slideSpeed);
}
function moveFrameIn(frame, cssConfigObject) {
    var localCssConfigObject = $.extend({}, cssConfigObject);
    var magnifyBy = 1;
    if ($(frame).data('quadrant')) {
        localCssConfigObject.enter.left = getOverlay($(frame).data("quadrant")).left + randomBetween(-20, 20);
        localCssConfigObject.enter.top = getOverlay($(frame).data("quadrant")).top + randomBetween(-20, 20);
        magnifyBy = 0.5;
    }
    localCssConfigObject.enter.height = framePositionDimension(frame, magnifyBy).height;
    localCssConfigObject.enter.width = framePositionDimension(frame, magnifyBy).width;
    $(frame).animate(localCssConfigObject.enter, animationSpeed.slideSpeed);
    
    //if ($(frame).data('quadrant')) {
    //    localCssConfigObject.enter.left = getOverlay($(frame).data("quadrant")).left;
    //    localCssConfigObject.enter.top = getOverlay($(frame).data("quadrant")).top;
    //}
    //$(frame).animate(localCssConfigObject.enter, animationSpeed.slideSpeed);
}

function framePositionDimension(frame, magnificationRatio){
 
    return { 
        height : carouselWindow.width() / $(frame).width() * $(frame).height() * magnificationRatio,
        width : carouselWindow.width() * magnificationRatio,
        topAdjustment : ($(carouselWindow).height() - $(frame).height()) / 2
    }
}

function blurFrame(delay, frame, fromBlur, toBlur, blurDuration){
    var currentBlur = { blurRadius : fromBlur.blurRadius };
    setTimeout(function () {
        $(frame).css(fromBlur);
        $(currentBlur).animate(toBlur, {
            duration: blurDuration,
            easing: 'swing',
            step: function () {
                $(frame).css({
                    "-webkit-filter": "blur(" + this.blurRadius + "px)",
                    "filter": "blur(" + this.blurRadius + "px)"
                });
            }
        });
    }, delay);
}

function getOverlay(quadrant){
    return quadrantPositions[quadrant];
}

function setCarouselDimension(){
    $(carouselWindow).css({
        width: $(window).width() ,
        height: $(window).height()
    });
}
function imageHeightRatio(){
    console.log(this);
    return ($(this).height());
//    return $(matchTo).width() / $(elementToResize).width();
}
function setElementDimension(elementToResize, matchTo, sizeRatio){
    var matchRatio = $(matchTo).width() / $(elementToResize).width();
    console.log(elementToResize);
    $(elementToResize).css({
        width: $(matchTo).width() * sizeRatio,
        height: $(elementToResize).height() * matchRatio * sizeRatio
    })
}

function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}




