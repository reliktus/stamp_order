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
    $(document).ready(function () {
        let preview = $('.stampPreviewContainer');
        let fromTop = $('.logo_font').outerHeight();
        let previewHeight = preview.height();
        let fromBottom = $('#stampOptionsContainer').outerHeight() + fromTop + 10 - previewHeight;
        console.log(fromBottom);
        preview.css('top',fromTop);
        $(document).scroll(function() {
            let scrollVal = $(document).scrollTop();
            move(scrollVal);
            if (scrollVal < fromTop) {
                move(fromTop + 'px');
            }
            if (scrollVal > fromBottom) {
                move(fromBottom + 'px');
            }
            function move(data) {
                $('.stampPreviewContainer').css('top',data);
            }
        });
    })
}

function resetBtn() {
    $('#resetBtn').on('click',function () {
        CKEDITOR.instances.editor.setData('');
        actualStamp.actionReset();
        order.actionReset();
        $('.stampPreview').html(actualStamp.text);
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
        console.log(data);
        $('.stampPreview').html(data);
        actualStamp.text = data;
        updateStampSize();
        order.actionSpecCheck();
    });
}

function updateStampSize() {
    let target = '.stampPreview';
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
