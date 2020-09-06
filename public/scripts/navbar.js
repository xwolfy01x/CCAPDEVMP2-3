$('.navbarbtn').hover(function() {
    var div;
    console.log('hover')
    $(this).children('.labellink').css('visibility', 'visible');
    $(this).children('.labellink').css('display', 'block');
    $(this).css('border-bottom', '5px solid #dabfff');
}, function() {
    $(this).children('.imglink').css('display', 'block');
    $(this).children('.labellink').css('visibility', 'hidden');
    $(this).children('.labellink').css('display', 'none');
    $(this).children('.labellink').css('visibility', 'hidden');
    $(this).css('border-bottom', '5px solid #5356ad');
})
$('.indexbtn').hover(function() {
    $(this).css('border-bottom', '5px solid #dabfff');
}, function() {
    $(this).css('border-bottom', '5px solid #5356ad');
})
$('.userbtns').hover(function() {
    $(this).css('border-bottom', '5px solid #dabfff');
}, function() {
    $(this).css('border-bottom', '5px solid #5356ad');
})