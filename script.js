"use strict";

let actualStamp = {
    color:"",
    textColorName:"X",
    actualModel:"X",
    modelName:"X",
    caseColor:"",
    caseColorName:"X",
    text:"",
    width:"",
    height:""
};
let stamps = {
    1:{ model:"Model_1",
        price:"10",
        picture:"img/stamp_example_1.jpg"},

    2:{ model:"Model_2",
        price:"12",
        picture:"img/stamp_example_2.jpg"},

    3:{ model:"Model_3",
        price:"15",
        picture:"img/stamp_example_3.jpg"}

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
        if (scrollVal > 395) {
            move('395px');
        }
        function move(data) {
            $('.stampPreviewContainer').css('top',data);
        }
    });
}

function updateColorButtons() {
    loader('.modelColorSwitch')
    loader('.textColorSwitch')
    loader('.modelSwitch')
    function loader(atr) {
        $(atr)
            .each(user_handler)
            .on('change', user_handler);
    }
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
        updateStampSize();
        colorSwitch();
        modelSwitch();
        switchCaseColor();
        moveTop();
    });
    function moveTop() {
        $('html,body').animate({ scrollTop: 0 }, 1000);
    }
}

function updateStampSize() {
    actualStamp.width = $('#stampPreview').width();
    actualStamp.height = $('#stampPreview').height();
    $('#stampSize').html(actualStamp.width + "x" + actualStamp.height);
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
function bouncer(atr) {
    $(atr).effect("bounce", {direction:'left', times: 1}, 300);
}

function colorSwitch() {
    let target = '.stampColorInfo';
    $('.textColorSwitch').on('click', function () {
        $(target).hide(300);
        actualStamp.color = $(this).attr('id');
        actualStamp.textColorName = $(this).attr('title');
        updateColor();
        $(target).show(300);
    });
    updateColor();
    function updateColor() {
        $(target).html('<b>' + actualStamp.textColorName + '</b>');
        $('#stampPreview').css('color',actualStamp.color);
    }
}

function modelSwitch() {
    let target = '.stampModelInfo';
    $('.modelSwitch').on('click', function () {
        let number = $(this).attr('id');
        console.log(number);
        actualStamp.actualModel = stamps[number];
        $(target).html('<b>' + actualStamp.actualModel.model +
            '</b><br><img class=\"stampPicture\" src=\"' + actualStamp.actualModel.picture + '\">');
        bouncer(target);
    });
    $(target).html('<b>' + actualStamp.modelName + '</b>' );
}
function switchCaseColor() {
    let target = '.CaseColorInfo';
    $('.modelColorSwitch').on('click',function () {
        let data = $(this).attr('id').slice(1);
        console.log("data: " + data);
        actualStamp.caseColorName = $(this).attr('title');
        $(target).html(actualStamp.caseColorName);
        bouncer(target);
    })
    $(target).html(actualStamp.caseColorName);
}
