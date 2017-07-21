var caseColor =["red","blue"];
var stampTextVal = "";
var stamp = {
    color:"",
    text:""
};
function displayStamp() {
    console.log("displayStamp: " + stampTextVal);
    stamp.color = caseColor;
    stamp.text = stampTextVal;
    if ( stampTextVal === "" ) {
        stampTextVal = $('#stampText').attr('placeholder');
    }
    $('#stampPreview').css('color',stamp.color);
    $('#stampPreview').html(stamp.text);
}
 function textUpdate() {
    stampTextVal = $('#stampText').val();
    console.log("textUpdate: " + stampTextVal);
    displayStamp();
}
function updateBtn() {
    $('.updateStampBtn').click(function() {
        textUpdate();
        console.log("[Zaktualizowano]");
    })
}
function resetBtn() {
    $('.resetStampBtn').click(function() {
        $('#stampText').val('');
        textUpdate();
        console.log("[Reset]");
    })
}
