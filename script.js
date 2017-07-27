var actualStamp = {
    color:"",
    textColorName:"X",
    actualModel:"X",
    modelName:"X",
    caseColor:"",
    caseColorName:"X",
    text:""
};
var stamps = {
    1:{ model:"Model_1",
        price:"10",
        picture:"img/stamp_example.jpg"},

    2:{ model:"Model_2",
        price:"12",
        picture:"img/stamp_example.jpg"},

    3:{ model:"Model_3",
        price:"15",
        picture:"img/stamp_example.jpg"}

};
function loadStampModels() {
    $('.stampPicture')
        .each(loadPicture)
        .on('change', loadPicture);

    function loadPicture() {
        var stat = $(this).closest('div').attr('id');
        $(this).attr('src',stamps[stat].picture);
    }

}
function previewSlider() {
    $(document).scroll(function() {
        var scrollVal = $(document).scrollTop();
        move(scrollVal);
        if (scrollVal < 40) {
            move('40px');
        }
        if (scrollVal > 355) {
            move('355px');
        }
        function move(data) {
            $('.stampPreviewContainer').css('top',data);
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

    function user_handler() {
        var stat = $(this).attr('id');
        $(this).css('color',stat).addClass('btn-default');
    }
}


function resetBtn() {
    $('#resetBtn').on('click',function () {
        CKEDITOR.instances.editor.setData('');
        $('#stampPreview').html("");
        actualStamp.color = "";
        actualStamp.text = "";
        actualStamp.textColorName = "X";
        actualStamp.actualModel = "";
        actualStamp.modelName ="X";
        actualStamp.caseColor="";
        actualStamp.caseColorName="X";
        colorSwitch();
        modelSwitch();
        moveTop();
    });
    function moveTop() {
        $('html,body').animate({ scrollTop: 0 }, 1000);
    }
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
        actualStamp.color = $(this).attr('id');
        actualStamp.textColorName = $(this).attr('title');
        updateColor();
    });
    updateColor();
    function updateColor() {
        $('.stampColorInfo').html('<b>' + actualStamp.textColorName + '</b>');
        $('#stampPreview').css('color',actualStamp.color)
    }
}

function modelSwitch() {
    $('.modelSwitch').on('click', function () {
        var number = $(this).attr('id');
        actualStamp.actualModel = stamps[number];
        $('.stampModelInfo').html('<b>' + actualStamp.actualModel.model + '</b><br><img class=\"stampPicture\" src=\"' + actualStamp.actualModel.picture + '/">');

    });
    $('.stampModelInfo').html('<b>' + actualStamp.modelName + '</b>' );
}

function updateStampSize() {


}