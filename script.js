var stamp = {
    color:"",
    textColorName:"",
    text:""
};
function updateColorButtons() {
    $('.textColorSwitch')
        .each(user_handler)
        .on('change', user_handler);
}
function user_handler() {
    var stat = $(this).attr('id');
    $(this).css('color',stat).addClass('btn-default');
}

function resetBtn() {
    $('#resetBtn').on('click',function () {
        CKEDITOR.instances.editor.setData('');
        $('#stampPreview').html("");
        stamp.color = "";
        stamp.text = "";
        stamp.textColorName = "";
        updateTextColor();
    })
}
function insertCKE() {
    CKEDITOR.replace( 'editor' );
    var editor = CKEDITOR.instances.editor;
    editor.on('key', function(){
        var data = editor.getData();
        $('#stampPreview').html(data);
        updateTextColor();
    });
}
function colorSwitch() {
    $('.textColorSwitch').on('click', function () {
        stamp.color = $(this).attr('id');
        stamp.textColorName = $(this).attr('title');
        updateTextColor()
    })
}
function updateTextColor() {
    $('.stampColorInfo').html('Kolor tuszu:' + stamp.textColorName);
    $('#stampPreview').css('color',stamp.color)
}