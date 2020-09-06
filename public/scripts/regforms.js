$(".info-item .btn").click(function(){
    $(".container").toggleClass("log-in");
});
function validateEmail(email) {
  return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email));
}
$(".container-form #reg").click(function(){
    let error = false;
    let errorMessage;
    if(!validateEmail($("#regemail").val())) {
        error = true;
        errorMessage='Please put an appropriate email!';
    } else {
      if ($("#regpass").val()!=$("#regcpass").val()) {
        errorMessage=`Please match your password and confirm password!`;
        error = true;
      }
    }
    if(!error) {
      document.regform.submit();
    }
    else {
      $("#regerror").css('display', 'block');
      $("#regerror").css('color', 'red');
      $("#regerror").text(errorMessage);
    }
});
$(".container-form #log").click(function(){
    document.logform.submit();
});