'use strict';
/*
    Actual stamp config
 */
let actualStamp = {
    color:"",
    textColorName:"X",
    actualModel:"X",
    modelName:"X",
    caseColor:"",
    caseColorName:"X",
    text: "",
    width: 0,
    height:"",
    actionReset: function () {
        this.color = "";
        this.text = "";
        this.textColorName = "X";
        this.actualModel = "";
        this.modelName = "X";
        this.caseColor = "";
        this.caseColorName="X";
        colorSwitch();
        modelSwitch();
        switchCaseColor();
    },
    actionDisplaySummary: function () {
        let html =
            '<div id=\"stampPreviewSpace\">' +
                '<div id=\"stampPreview\"></div>' +
            '</div>' +
            '<h5><u>Rozmiar pieczątki:</u></h5>' +
            '<div id=\"stampSize\">X</div>' +
            '<p><u>Dane pięczątki:</u></p>' +
            'Kolor tuszu:<div class=\"stampColorInfo\"></div>' +
            'Model:<div class=\"stampModelInfo\"></div>' +
            'Kolor obudowy:<div class=\"CaseColorInfo\"></div>';
        document.write(html);
    }
};

/*
    Stamp container functions
 */
function colorSwitch() {
    let target = '.stampColorInfo';
    let newVal = 'X';
    $('.textColorSwitch').on('click', function () {
        actualStamp.color = $(this).attr('datatype');
        // console.log(actualStamp.color);
        actualStamp.textColorName = $(this).attr('title');
        newVal = '<b>' + actualStamp.textColorName + '</b>';
        updateColor();
        animate_check(target,newVal);
    });
    animate_check(target,newVal);
}
function updateColor() {
    let target = '#stampPreview';
    $(target).fadeOut(function(){
        $(target).css('color',actualStamp.color).fadeIn(400);
    })
}

function modelSwitch() {
    let target = '.stampModelInfo';
    let newVal = '<b>X</b>';
    $('.modelSwitch').on('click', function () {
        let number = $(this).attr('id');
        actualStamp.actualModel = stamps[number];
        order.price = actualStamp.actualModel.price;
        newVal = '<b>' + actualStamp.actualModel.model + '</b><br><img class=\"stampPicture\" src=\"' + actualStamp.actualModel.picture + '\">';
        animate_check(target,newVal);
        showPrice();
    });
    animate_check(target,newVal);
}
function switchCaseColor() {
    let target = '.CaseColorInfo';
    let newVal = "<b>X</b>";
    $('.modelColorSwitch').on('click',function () {
        actualStamp.caseColor = $(this).attr('datatype');
        actualStamp.caseColorName = $(this).attr('title');
        newVal = '<b>' + actualStamp.caseColorName + '</b>';
        animate_check(target,newVal);
    });
    animate_check(target,newVal);
}