
jostleLeafs();
function moveLeaf(){
    $(".backLeaf").each(function (){
        $(this).css({ top : (( $(this).data().topoffset) - ($(window).scrollTop()* $(this).data().depth)) });
        
    });
}

function jostleLeafs(){
    $(".backLeaf").each(function () {
        $(this).css({ "transform": "rotate(" + Math.random()*360 + "deg)" });
    });
}