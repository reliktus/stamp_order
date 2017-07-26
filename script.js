var stamp = {
    color:"",
    textColorName:"X",
    model:"",
    modelName:"X",
    caseColor:"",
    caseColorName:"X",
    text:""
};

function previewSlider() {
    $(document).scroll(function() {
        var scrollVal = $(document).scrollTop();
        $('.stampPreviewContainer').css('top',scrollVal+'px');
        if (scrollVal < 50) {
            $('.stampPreviewContainer').css('top','50px');
        }
        if (scrollVal > 335) {
            $('.stampPreviewContainer').css('top','335px');
        }
    });
}

function updateColorButtons() {

    $('.modelColorSwitch')
        .each(user_handler)
        .on('change', user_handler);
    $('.textColorSwitch')
        .each(user_handler)
        .on('change', user_handler);
    $('.modelSwitch')
        .each(user_handler)
        .on('change', user_handler);
}
function user_handler() {
    var stat = $(this).attr('id');
    $(this).css('color',stat).addClass('btn-default');
}
function moveTop() {
    $('html, body').animate({ scrollTop: 10 }, 'fast');
}
function resetBtn() {
    $('#resetBtn').on('click',function () {
        CKEDITOR.instances.editor.setData('');
        $('#stampPreview').html("");
        stamp.color = "";
        stamp.text = "";
        stamp.textColorName = "X";
        stamp.model = "";
        stamp.modelName ="X";
        stamp.caseColor="";
        stamp.caseColorName="X";
        colorSwitch();
        modelSwitch();
        moveTop();
    })
}
function insertCKE() {
    CKEDITOR.replace( 'editor' );
    var editor = CKEDITOR.instances.editor;
    editor.on('key', function(){
        var data = editor.getData();
        $('#stampPreview').html(data);
        colorSwitch();
        updateStampSize();
    });
}
function colorSwitch() {
    $('.textColorSwitch').on('click', function () {
        stamp.color = $(this).attr('id');
        stamp.textColorName = $(this).attr('title');
        $('.stampColorInfo').html('<b>' + stamp.textColorName + '</b>');
        $('#stampPreview').css('color',stamp.color)
    });
    $('.stampColorInfo').html(stamp.textColorName);
    $('#stampPreview').css('color',stamp.color)
}
function modelSwitch() {
    $('.modelSwitch').on('click', function () {
        stamp.model = $(this).attr('id');
        stamp.modelName = $(this).attr('title');
        $('.stampModelInfo').html('<b>' + stamp.modelName + '</b>');
    });
    $('.stampModelInfo').html(stamp.modelName);
}
function updateStampSize() {


}