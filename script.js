var caseColor =["red","blue"];
var stampText = $('#stampText').placeholder();
var stamp = {
    color:caseColor[0],
    text:stampText
};
function displayStamp() {
    $('#stampPreview').innerHTML(stamp.text);
}
function updateStamp() {
    stampText = $('#stampText').val();
    displayStamp()
}