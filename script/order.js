'use strict';

let order = {
    count: 1,
    price: 0,
    total: 0,
    orderSpec: false,
    fullName:"",
    phone: "",
    address: "",
    email: "",
    extraInfo: "",
    invName:'',
    invNip: "",
    invAddress:'',
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
    let target2 = '#targetShowPaymentSummary';
    let strPrice = (order.price).toFixed(2);
    let html = order.count + ' X ' + strPrice + ' = ' + order.total + ' zł';
    animate_check(target,html);
    animate_check(target2,html);
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
                    '<div class=\"col-sm-4 \"><h2>Ilość:</h2></div>' +
                    '<div class=\"col-sm-8\">' +
                        '<div class=\"btn btn-info stampCount col-sm-3" datatype=\"--\">-</div>' +
                        '<div class=\"col-sm-6\"><h2 id=\"stampNumber\">1</h2></div>' +
                        '<div class=\"btn btn-info stampCount col-sm-3\" datatype=\"++\">+</div>'+
                    '</div>' +
                '</div>';
    document.write(data);
}
//  Display order data on summary page
function goSummary() {
    function displayDataSummary() {
        let html =
            '<h4><u>Dane do wysyłki:</u></h4>' +
            '<div>' + order.fullName + '</div>' +
            '<div>' + order.address + '</div>' +
            '<br>' +
            '<p><u>Kontakt:</u></p>' +
            '<p>' + order.phone + '</p>' +
            '<br>' +
            '<p><u>Potwierdzenie na adres:</u></p>' +
            '<p>' + order.email + '</p>' +
            '<p><u>Dane do faktury:</u></p>' +
            '<div>' + order.invName + '</div>' +
            '<div>' + order.invNip + '</div>' +
            '<div>' + order.invAddress + '</div>';
        $('#targetShowDataSummary').html(html);
    }
    //  Summary button action
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
        displayDataSummary();
    });
    //  Save data form live on change
    $('.form-control').on('change',function () {
        let dataKey = $(this).attr('datatype');
        order[dataKey] = $(this).val();
    });
    //  Send data to php mail script and block page from reload after php script running
    $('#form1').on('submit', function(event) {
        event.preventDefault();
        let formData = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: 'script/mail.php',
            dataType: "jsonp",
            data: formData,

            success: function(response) {
                alert('Data send alert');
                $('#summary').html(response + 'Dziękujemy za zamowienie. Potwierdzenie wysłane na maila.')
            }

        });
        let target = '#summary';
        let newVal = '<i class="fa fa-smile-o fa-5x" aria-hidden="true"></i>' +
            '<h2 class="text-info"><p>Dziękujemy za zamówienie.</p></h2>' +
            '<p><h4 class="text-info">Potwierdzenie zostało wysłane na podany adres E-mail.</h4></p>';
        animate_check(target,newVal)
    });

}
