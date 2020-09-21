$('.navbarbtn').hover(function() {
    $(this).css('background-color', 'darkred');
    $(this).children('.labellink').css('color', 'white');
}, function() {
    $(this).css('background-color', '#BFBEBE');
    $(this).children('.labellink').css('color', 'black');
})
$('#postdiv').hover(function() {
    $(this).css('background-color', 'darkred');
    $(this).css('border-bottom', '5px solid darkred');
}, function() {
    $(this).css('background-color', 'BFBEBE');
    $(this).css('border-bottom', '5px solid #BFBEBE');
})
$('.userbtn').hover(function() {
    let navbarheight = 0;

    $(this).css('background-color', 'darkred');
	navbarheight = $('#navbar').height();
	$('.drop').css('top', navbarheight);
}, function() {
    $(this).css('background-color', '#BFBEBE');
    $(this).css('border-bottom', '5px solid #BFBEBE');
})
$('.indexbtn').hover(function() {
    $(this).css('background-color', 'darkred');
    $(this).css('color', 'white');
    $(this).css('border-bottom', '5px solid darkred');
}, function() {
    $(this).css('background-color', '#BFBEBE');
    $(this).css('color', 'black');
    $(this).css('border-bottom', '5px solid #BFBEBE');
})
