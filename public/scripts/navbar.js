$('.navbarbtn').hover(function() {
    $(this).css('background-color', 'darkred');
    $(this).children('.labellink').css('color', 'white');
    $(this).css('border-bottom', '5px solid darkred');
}, function() {
    $(this).css('background-color', '#BFBEBE');
    $(this).children('.labellink').css('color', 'black');
    $(this).css('border-bottom', '5px solid #BFBEBE');
})
$('#postdiv').hover(function() {
    $(this).css('background-color', 'darkred');
    $(this).css('border-bottom', '5px solid #b04632');
}, function() {
    $(this).css('background-color', 'BFBEBE');
    $(this).css('border-bottom', '5px solid #BFBEBE');
})
$('.userbtns').hover(function() {
    $(this).css('background-color', 'darkred');
    $(this).css('border-bottom', '5px solid #b04632');
}, function() {
    $(this).css('background-color', '#BFBEBE');
    $(this).css('border-bottom', '5px solid #BFBEBE');
})
$('.indexbtn').hover(function() {
    $(this).css('background-color', 'darkred');
    $(this).css('color', 'white');
    $(this).css('border-bottom', '5px solid #b04632');
}, function() {
    $(this).css('background-color', '#BFBEBE');
    $(this).css('color', 'black');
    $(this).css('border-bottom', '5px solid #BFBEBE');
})