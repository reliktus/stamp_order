'use strict';

function loader(){
    colorSwitch();
    modelSwitch();
    resetBtn();
    insertCKE();
    updateColorButtons();
    previewSlider();
    loadStampModels();
    switchCaseColor();
    stampCount();
    backToOrder();
    goSummary();
}

function loadStampModels() {
    $('.stampPicture')
        .each(loadPicture)
        .on('change', loadPicture);
    function loadPicture() {
        let stat = $(this).closest('div').attr('id');
        $(this).attr('src',stamps[stat].picture);
    }
}

function updateColorButtons() {
    loader('.modelColorSwitch');
    loader('.textColorSwitch');
    loader('.modelSwitch');
    function loader(atr) {
        $(atr)
            .each(user_handler)
            .on('change', user_handler);
    }
    function user_handler() {
        let stat = $(this).attr('datatype');
        $(this).css('color',stat).addClass('btn-default');
    }
}

// Keep preview slider on sight
function previewSlider() {
    $(document).scroll(function() {
        let scrollVal = $(document).scrollTop();
        move(scrollVal);
        if (scrollVal < 40) {
            move('40px');
        }
        if (scrollVal > 315) {
            move('315px');
        }
        function move(data) {
            $('.stampPreviewContainer').css('top',data);
        }
    });
}

function resetBtn() {
    $('#resetBtn').on('click',function () {
        CKEDITOR.instances.editor.setData('');
        actualStamp.actionReset();
        order.actionReset();
        $('#stampPreview').html(actualStamp.text);
        moveTop();
    });
    function moveTop() {
        $('html,body').animate({ scrollTop: 0 }, 1000);
    }
}

/*
 WYSIWYG editor loading
  */
function insertCKE() {
    CKEDITOR.replace( 'editor' );
    let editor = CKEDITOR.instances.editor;
    editor.on('change', function(){
        let data = editor.getData();
        $('#stampPreview').html(data);
        actualStamp.text = data;
        updateStampSize();
        order.actionSpecCheck();
    });
}

function updateStampSize() {
    let target = '#stampPreview';
    actualStamp.width = $(target).width();
    actualStamp.height = $(target).height();
    $('#stampSize').html(actualStamp.width + "x" + actualStamp.height);
}

function animate_check(atr, newVal) {
    order.actionSpecCheck();
    $(atr).fadeOut(function(){
        $(atr).html(newVal).fadeIn(200);
    })
}