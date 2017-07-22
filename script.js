var stamp = {
    color:"red",
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
        updateTextColor()
    })
}
function updateTextColor() {
    $('#stampPreview').css('color',stamp.color)
}