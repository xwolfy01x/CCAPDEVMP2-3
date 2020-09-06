let slideNumber = -1;
showSlide();
function showSlide() {
    let slides = document.getElementsByClassName('slides');
    console.log(slides);    
    for (let i = 0; i< slides.length; i++) {
        slides[i].style.display="none";     
    }
    slideNumber++;
    slides[slideNumber%slides.length].style.display="block";
    setTimeout(showSlide, 5000);
}
$('.slides').hover(function() {
    $(this).children('#slideimg').css('border-left', '10px solid #DABFFF')
}, function() {
    $(this).children('#slideimg').css('border-left', '10px solid #7fdeff')
})
$('#slideshow .text').hover(function() {
    $(this).css('border-right', '10px solid #DABFFF')
}, function() {
    $(this).css('border-right', '10px solid #7fdeff')
})
$('#aboutus .txt').hover(function() {
    $(this).css('border-left', '10px solid #DABFFF')
}, function() {
    $(this).css('border-left', '10px solid #7fdeff')
})
$('#aboutus .image').hover(function() {
    $(this).children('#aboutimg').css('border-right', '10px solid #DABFFF')
}, function() {
    $(this).children('#aboutimg').css('border-right', '10px solid #7fdeff')
})