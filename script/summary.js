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

function displaySummary() {

    let html ='';

    document.write(html);
}
function tester() {
    $('#cke22')
        .each(clicker)
        .on('change',clicker);
    function clicker() {
        $('#cke_22').click();
    }

}
