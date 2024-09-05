// ==UserScript==
// @name         Saveetha Food App+
// @namespace    http://tampermonkey.net/
// @version      2024-09-04
// @description  try to take over the world!
// @author       Adhil
// @match        https://life.saveetha.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=saveetha.com
// @require      https://cdn.jsdelivr.net/npm/toastify-js
// @grant        none


// ==/UserScript==

(function() {
    'use strict';
    function savecartitem2(){
            $("#popupshowitems").popup("close");
            $("#popupprogress").popup("open");

            var msgsuccess = '';

            var totalcartvalue = $("#ContentPlaceHolder1_hdntotalprice").val();

                var availablebalance = $("#ContentPlaceHolder1_hdnavailablecredit").val();

                if (parseFloat(totalcartvalue) > 0) {

                    if (parseFloat(availablebalance) >= parseFloat(totalcartvalue)) {

                        var jsonCustomidentifier = [];

                        var lsttotalprice = 0;

                        $.each(jsonObjwork, function (i, item) {

                            var appdata = {};

                            appdata.hotelid = $("#ContentPlaceHolder1_hdnhotelid").val();
                            appdata.itemid = item.itemid;
                            appdata.itemcount = item.itemcount;
                            appdata.itemprice = item.itemprice;
                            appdata.totalprice = $("#ContentPlaceHolder1_hdntotalprice").val();
                            appdata.itemname = '';
                            appdata.createdby = $("#ContentPlaceHolder1_hdnstudentid").val();
                            appdata.servicetype = $("#ddlservicetype").val();
                            appdata.deliverylocation = $("#txtlocation").val();
                            lsttotalprice += (item.itemcount * item.itemprice);

                            jsonCustomidentifier.push(appdata);

                            $("#hviewtotalcart").text($("#ContentPlaceHolder1_hdntotalprice").val());
                        });

                        if (lsttotalprice == $("#ContentPlaceHolder1_hdntotalprice").val()) {

                            $.ajax({
                                type: 'POST',
                                url: "Orders.aspx/SaveDetail",
                                data: "{LstDetails:" + JSON.stringify(jsonCustomidentifier) + "}",
                                contentType: 'application/json; charset=utf-8',
                                dataType: 'json',
                                success: function (r) {
                                    msgsuccess = r.d;

                                    if (msgsuccess == "Error") {
                                        alert('error occured');

                                        setTimeout(function () {
                                            $("#popupprogress").popup("close");
                                        }, 3000);

                                    }
                                    else if (msgsuccess == "malpractice") {

                                        alert('account may get locked due to malpractice activity.');
                                    }
                                    else if (msgsuccess == "LowBalance") {
                                        alert('Low balance. Please add the balance to wallet');

                                        setTimeout(function () {
                                            $("#popupprogress").popup("close");
                                        }, 3000);

                                    }
                                    else {

                                        Toastify({
                                            text: "Order succesfully initiated! [ View ]",
                                            duration: 3000,
                                            destination: "OrderStatus.aspx?orderauto",
                                            newWindow: false,
                                            close: false,
                                            gravity: "bottom", // `top` or `bottom`
                                            position: "center", // `left`, `center` or `right`
                                            stopOnFocus: true, // Prevents dismissing of toast on hover
                                            style: {
                                                background: "#00b09b",
                                                borderRadius: "10px",
                                            },
                                            onClick: function(){} // Callback after click
                                        }).showToast();

                                        setTimeout(function () {
                                            $("#popupprogress").popup("close");
                                        }, 3000);

                                        $("#popupshowitems").popup("close");
                                        //$("#dvorderdetails").show();

                                        jsonObjwork = [];

                                        $("#ContentPlaceHolder1_hdntotalprice").val('0');

                                        $("#ContentPlaceHolder1_hdnitems").val('')
                                        $("#ContentPlaceHolder1_hdnitemcount").val('')

                                        $('#htotalcart').text('0');
                                        $('#hpaytotalcart').text('0');
                                        //window.location = "OrderStatus.aspx?orderauto";
                                    }
                                }
                            });

                    }
                    else {
                        alert('Total Cart value and items total amount not matching please reset the item details.');
                    }
                }
                else {
                    alert('Low balance in your wallet. Please load the balance to proceed the order.');
                }
            }
            else {
                alert('Select item to initiate order.');
            }
}


function codeAddress() {
   // toastr.options.closeButton = true;
   // toastr.options.closeHtml = "<button onclick='function(){window.location = `OrderStatus.aspx?orderauto`;}'><small>View Order</small></button>";



   try{
   document.querySelector('#popupshowitems > div.ui-corner-bottom > div:nth-child(6) > a').onclick = savecartitem2;
   }catch{}
   let url = new URL(window.location.href);

    if (url.searchParams.has('orderauto')) {
    window['view'](parseInt(document.querySelector('#ollistview > li.ui-last-child > a').getAttribute('onclick').split('view(')[1].split(');')[0]));
    }
    if (window.location.pathname.includes('Orders.aspx')){
    document.querySelector('#hbackloc').href = 'OrderbyHotel.aspx';
    }
}

window.onload = codeAddress;

document.head.insertAdjacentHTML(
    'beforeend',
    '<link rel="stylesheet" href="https://raw.githubusercontent.com/Adhil-B/app-plus/main/main.css" />');

document.head.insertAdjacentHTML(
    'beforeend',
    '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css" />');



})();
