'use strict';

let order = {
    count: 1,
    price: 0,
    total: 0,
    orderSpec: false,
    test: "",
    orderData: {
        fullName:"",
        phone: "",
        address: "",
        mail: "",
        extraInfo: ""},
    orderInvoice: {
        fullName: "",
        NIP: "",
        address: ""
    },
    actionTotal: function() {
        this.total = (this.count * this.price).toFixed(2)
    },
    // Sprawdzenie warunkow zamowienia + odniesienie do funkcji animujacej panel z danymi
    actionSpecCheck: function () {
        this.orderSpec = ( actualStamp.color !=="" && this.total !==0 && actualStamp.caseColor !=="" && actualStamp.text !=="");
        let target = '#paymentContainer';
        paymentShow(target);
    },
    actionReset: function () {
        this.count = 1;
        this.price = 0;
        this.actionSpecCheck();
        showPrice();
    },
    actionCount: function (atr) {
        if (atr==="++") {
            this.count++;
        } else {
            if (this.count > 1) {
                this.count--;
            }
        }
    }
};

//Funkcja pokazuja/ukrywajaca panel danych kontaktowych w zaleznosci od stanu zamowienia + aktywacja podsumowania
function paymentShow(atr) {
    let stat = $(atr).css('display');
    if (order.orderSpec && stat === 'none') {
        $(atr).css('display', 'block');
        $(atr).animate({
            height: "345px",
            opacity: 1,
        }, 1000, function () {
            console.log("Payment data shown");
            $('#orderBtn').removeClass('disabled').prop("disabled",false);
        });
    } else if (order.orderSpec === false && stat === 'block'){
        $(atr).animate( {
            height: "0px",
            opacity: 0,
        }, function () {
            console.log("Payment data hidden");
            $(atr).css('display', 'none');
            $('#orderBtn').addClass('disabled').prop("disabled",true);
        });
    }
}

function showPrice() {
    order.actionTotal();
    // console.log(order.total);
    let target ='#price1';
    animate_check(target,order.total + ' zł')
}

function stampCount() {
    $('.stampCount').on('click',function () {
        let atr = $(this).attr('datatype');
        order.actionCount(atr);
        updateStampNumber();
        showPrice();
    });
    function updateStampNumber() {
        let target = '#stampNumber';
        animate_check(target,order.count);
    }
}

function drawCounter() {
    let data = '<div class=\"row \">' +
                    '<div class=\"col-sm-3\"><h2>Ilość:</h2></div>' +
                    '<div class=\"col-sm-5\">' +
                        '<div class=\"btn btn-info stampCount col-sm-3\" datatype=\"--\">-</div>' +
                        '<div class=\"col-sm-4\"><h2 id=\"stampNumber\">1</h2></div>' +
                        '<div class=\"btn btn-info stampCount col-sm-3\" datatype=\"++\">+</div>'+
                    '</div>' +
                '</div>';
    document.write(data);
}

function goSummary() {
    $('#orderBtn').on('click', function(){
        $('#mainPageContainer').animate(
            { opacity: 0 }, 500, function () {
                $('#mainPageContainer').css('display','none');
            }
        );
        $('#summary').css('display','block').animate(
            { opacity: 1 }, 1200, function () {
                $('html,body').animate({ scrollTop: 0 }, 100);
            });

    })
}
function updateOrderData() {
    $('.form-control').on('change',function () {
        let dataKey = $(this).attr('datatype');
        // let dataVal = (this).val();
        // console.log("[key:] " + dataKey + " [dataVal:] " + dataVal);
        order[dataKey] =  $(this).val();

    })

}