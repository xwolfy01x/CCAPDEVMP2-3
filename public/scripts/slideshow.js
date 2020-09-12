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