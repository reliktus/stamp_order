'use strict';

function backToOrder() {
    $('#backBtn').on('click', function(){
        $('#summary').animate(
            { opacity: 0 }, 500, function () {
                $('#summary').css('display','none');
            }
        );
        $('#mainPageContainer').css('display','block').animate(
            { opacity: 1 }, 1500);
    })
}

function sendForm() {
    $('#sendBtn').on('click',function () {
        //$.get("script/mail.php");
        // return false;
        $('#form1').submit();
        //alert("clicked");
    })
}

function displaySummary() {

    let html ='';

    document.write(html);
}
