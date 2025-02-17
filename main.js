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
try{
            // Save input text to localStorage
function saveInputText(inputId) {
  const inputValue = document.getElementById(inputId).value;
  localStorage.setItem(inputId, inputValue);
}

// Load input text from localStorage
function loadInputText(inputId) {
  const savedValue = localStorage.getItem(inputId);
  if (savedValue) {
    document.getElementById(inputId).value = savedValue;
  }
}

// Example usage
const inputElement = document.getElementById("txtusername");
const inputElement2 = document.getElementById("txtpassword");

// Save the input value on change
inputElement.addEventListener("input", () => {
  saveInputText("txtusername");
});
inputElement2.addEventListener("input", () => {
  saveInputText("txtpassword");
});

// Load the saved value on page load
loadInputText("txtusername");
loadInputText("txtpassword");
}catch{}

document.head.insertAdjacentHTML(
    'beforeend',
    '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css" />');




//Resturant List
if (window.location.pathname.includes('/Food/OrderbyHotel.aspx')) {
(function () {
    let favorites = JSON.parse(localStorage.getItem("favoriteRestaurants")) || [];

    function saveFavorites() {
        localStorage.setItem("favoriteRestaurants", JSON.stringify(favorites));
    }

    function toggleFavorite(hotelId) {
        const index = favorites.indexOf(hotelId);
        if (index === -1) {
            favorites.push(hotelId);
        } else {
            favorites.splice(index, 1);
        }
        saveFavorites();
        updateList();
    }

    function updateList() {
        let list = $("#ollistview");
        let items = list.children("li").get();

        let favoriteItems = [];
        let normalItems = [];

        items.forEach(item => {
            let id = $(item).data("hotel-id");
            if (favorites.includes(id)) {
                favoriteItems.push(item);
            } else {
                normalItems.push(item);
            }
        });

        list.empty();

        if (favoriteItems.length > 0) {
            list.append('<li data-role="list-divider" style="background: #ffcc00; font-weight: bold;">⭐ Favorites</li>');
            list.append(favoriteItems);
        }

        if (normalItems.length > 0) {
            list.append('<li data-role="list-divider" style="background: #ccc; font-weight: bold;">🍽️ All Restaurants</li>');
            list.append(normalItems);
        }

        list.listview("refresh");
    }


toggleFavorite("35");
        updateList();



})();

}
//Restauant Food
if (window.location.pathname.includes('/Food/Orders.aspx')) {
(function () {
    let favorites = JSON.parse(localStorage.getItem("favoriteRestaurants")) || [];

    function saveFavorites() {
        localStorage.setItem("favoriteRestaurants", JSON.stringify(favorites));
    }

    function toggleFavorite(hotelId) {
        const index = favorites.indexOf(hotelId);
        if (index === -1) {
            favorites.push(hotelId);
        } else {
            favorites.splice(index, 1);
        }
        saveFavorites();
        updateList();
    }

    function updateList() {
        let list = $("#ollistview");
        let items = list.children("li").get();

        let favoriteItems = [];
        let normalItems = [];

        items.forEach(item => {
            let id = $(item).data("hotel-id");
            if (favorites.includes(id)) {
                favoriteItems.push(item);
            } else {
                normalItems.push(item);
            }
        });

        list.empty();

        if (favoriteItems.length > 0) {
            list.append('<li data-role="list-divider" style="background: #ffcc00; font-weight: bold;">⭐ Favorites</li>');
            list.append(favoriteItems);
        }

        if (normalItems.length > 0) {
            list.append('<li data-role="list-divider" style="background: #ccc; font-weight: bold;">🍽️ All Restaurants</li>');
            list.append(normalItems);
        }

        list.listview("refresh");
    }

    function enhanceList() {
        $("#ollistview li").each(function () {
            let link = $(this).find("a");
            let href = link.attr("href");
            let hotelId = new URLSearchParams(href.split("?")[1]).get("id");

            if (!hotelId) return;

            $(this).attr("data-hotel-id", hotelId);

            let favButton = $("<button>")
                .text(favorites.includes(hotelId) ? "★" : "☆")
                .css({
                    float: "right",
                    fontSize: "20px",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                })
                .click(function (e) {
                    e.preventDefault();
                    toggleFavorite(hotelId);
                    $(this).text(favorites.includes(hotelId) ? "★" : "☆");
                });

            link.append(favButton);
        });

        updateList();
    }

    $(document).ready(function () {
        setTimeout(enhanceList, 100); // Delay to ensure data loads
    });
})();

}



//Order
if (window.location.pathname.includes('/Food/OrderStatus.aspx')) {
/*! NoSleep.min.js v0.12.0 - git.io/vfn01 - Rich Tibbett - MIT license */
!function(A,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.NoSleep=e():A.NoSleep=e()}(this,(function(){return function(A){var e={};function B(g){if(e[g])return e[g].exports;var o=e[g]={i:g,l:!1,exports:{}};return A[g].call(o.exports,o,o.exports,B),o.l=!0,o.exports}return B.m=A,B.c=e,B.d=function(A,e,g){B.o(A,e)||Object.defineProperty(A,e,{enumerable:!0,get:g})},B.r=function(A){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(A,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(A,"__esModule",{value:!0})},B.t=function(A,e){if(1&e&&(A=B(A)),8&e)return A;if(4&e&&"object"==typeof A&&A&&A.__esModule)return A;var g=Object.create(null);if(B.r(g),Object.defineProperty(g,"default",{enumerable:!0,value:A}),2&e&&"string"!=typeof A)for(var o in A)B.d(g,o,function(e){return A[e]}.bind(null,o));return g},B.n=function(A){var e=A&&A.__esModule?function(){return A.default}:function(){return A};return B.d(e,"a",e),e},B.o=function(A,e){return Object.prototype.hasOwnProperty.call(A,e)},B.p="",B(B.s=0)}([function(A,e,B){"use strict";var g=function(){function A(A,e){for(var B=0;B<e.length;B++){var g=e[B];g.enumerable=g.enumerable||!1,g.configurable=!0,"value"in g&&(g.writable=!0),Object.defineProperty(A,g.key,g)}}return function(e,B,g){return B&&A(e.prototype,B),g&&A(e,g),e}}();var o=B(1),E=o.webm,n=o.mp4,C=function(){return"undefined"!=typeof navigator&&parseFloat((""+(/CPU.*OS ([0-9_]{3,4})[0-9_]{0,1}|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent)||[0,""])[1]).replace("undefined","3_2").replace("_",".").replace("_",""))<10&&!window.MSStream},Q=function(){return"wakeLock"in navigator},i=function(){function A(){var e=this;if(function(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}(this,A),this.enabled=!1,Q()){this._wakeLock=null;var B=function(){null!==e._wakeLock&&"visible"===document.visibilityState&&e.enable()};document.addEventListener("visibilitychange",B),document.addEventListener("fullscreenchange",B)}else C()?this.noSleepTimer=null:(this.noSleepVideo=document.createElement("video"),this.noSleepVideo.setAttribute("title","No Sleep"),this.noSleepVideo.setAttribute("playsinline",""),this._addSourceToVideo(this.noSleepVideo,"webm",E),this._addSourceToVideo(this.noSleepVideo,"mp4",n),this.noSleepVideo.addEventListener("loadedmetadata",(function(){e.noSleepVideo.duration<=1?e.noSleepVideo.setAttribute("loop",""):e.noSleepVideo.addEventListener("timeupdate",(function(){e.noSleepVideo.currentTime>.5&&(e.noSleepVideo.currentTime=Math.random())}))})))}return g(A,[{key:"_addSourceToVideo",value:function(A,e,B){var g=document.createElement("source");g.src=B,g.type="video/"+e,A.appendChild(g)}},{key:"enable",value:function(){var A=this;return Q()?navigator.wakeLock.request("screen").then((function(e){A._wakeLock=e,A.enabled=!0,console.log("Wake Lock active."),A._wakeLock.addEventListener("release",(function(){console.log("Wake Lock released.")}))})).catch((function(e){throw A.enabled=!1,console.error(e.name+", "+e.message),e})):C()?(this.disable(),console.warn("\n        NoSleep enabled for older iOS devices. This can interrupt\n        active or long-running network requests from completing successfully.\n        See https://github.com/richtr/NoSleep.js/issues/15 for more details.\n      "),this.noSleepTimer=window.setInterval((function(){document.hidden||(window.location.href=window.location.href.split("#")[0],window.setTimeout(window.stop,0))}),15e3),this.enabled=!0,Promise.resolve()):this.noSleepVideo.play().then((function(e){return A.enabled=!0,e})).catch((function(e){throw A.enabled=!1,e}))}},{key:"disable",value:function(){Q()?(this._wakeLock&&this._wakeLock.release(),this._wakeLock=null):C()?this.noSleepTimer&&(console.warn("\n          NoSleep now disabled for older iOS devices.\n        "),window.clearInterval(this.noSleepTimer),this.noSleepTimer=null):this.noSleepVideo.pause(),this.enabled=!1}},{key:"isEnabled",get:function(){return this.enabled}}]),A}();A.exports=i},function(A,e,B){"use strict";A.exports={webm:"data:video/webm;base64,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",mp4:"data:video/mp4;base64,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"}}])}));
}
//Home 
if (window.location.pathname.includes('/Food/Index.aspx')) {
            (function() {
    'use strict';


    const modernCSS = `
    /* Dark Base Theme */
    body, .ui-page, .ui-header, .ui-content, .ui-popup {
        background: #0f0f0f !important;
        color: #ffffff !important;
        font-family: 'Segoe UI', system-ui, sans-serif !important;
    }





.ui-grid-a > .ui-block-a, .ui-grid-a > .ui-block-b {
  width: 43vw;
}
.ui-overlay-a, .ui-page-theme-a, .ui-page-theme-a .ui-panel-wrapper {
  text-shadow: none !important;
}
.ui-page-theme-a .ui-btn, html .ui-bar-a .ui-btn, html .ui-body-a .ui-btn, html body .ui-group-theme-a .ui-btn, html head + body .ui-btn.ui-btn-a, .ui-page-theme-a .ui-btn:visited, html .ui-bar-a .ui-btn:visited, html .ui-body-a .ui-btn:visited, html body .ui-group-theme-a .ui-btn:visited, html head + body .ui-btn.ui-btn-a:visited {
  text-shadow: none !important;
}
.ui-link.ui-btn.ui-btn-a.ui-shadow.ui-corner-all {
  box-shadow: none !important;
}
.ui-footer {
  border-width: 0px !important;
}
.ui-bar-a, .ui-page-theme-a .ui-bar-inherit, html .ui-bar-a .ui-bar-inherit, html .ui-body-a .ui-bar-inherit, html body .ui-group-theme-a .ui-bar-inherit {
  background-color: #0f0f0f !important;
}
    /* Modern Header with Flex Layout */
    [data-role="header"] {
    position: absolute !important;
        background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%) !important;
        border: none !important;
        /*padding: 15px 20px !important;*/
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3) !important;
    }

    [data-role="header"] h1 {
        /*font-size: 1.8rem !important;*/
        font-weight: 700 !important;
        text-shadow: 0 2px 4px rgba(0,0,0,0.3) !important;
    }

    /* Balance Display */
    #dvorderdetails {
width : 20vw !important;
margin: 2vw;
margin-right: 5vw !important;
top: 0vh !important;
        position: absolute !important;
        z-index: 9999;
        background: rgba(255,106,0,0.15) !important;
        border-radius: 12px !important;
        padding: 8px 15px !important;
        backdrop-filter: blur(5px) !important;
        border: 1px solid rgba(255,106,0,0.3) !important;
    }
    .ui-header .ui-title, .ui-footer .ui-title {
  font-size: 1.5em !important;
  margin-left: 5vw !important;
  }

    #havilableamount {
        color: white !important;
        font-weight: 700 !important;
        font-size: 1.4rem !important;
    }

    /* Modern Card Grid */
    .ui-grid-a {
        display: grid !important;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)) !important;
        gap: 1.2rem !important;
        padding: 1rem !important;
    }

    .ui-block-a, .ui-block-b {
        background: linear-gradient(145deg, #1e1e1e 0%, #2a2a2a 100%) !important;
        border-radius: 16px !important;
        padding: 1rem !important;
        border: 1px solid rgba(255,255,255,0.1) !important;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        box-shadow: 0 4px 6px rgba(0,0,0,0.15) !important;
    }

    .ui-block-a:hover, .ui-block-b:hover {
        transform: translateY(-3px) !important;
        box-shadow: 0 8px 15px rgba(0,0,0,0.3) !important;
    }

    .ui-btn {
        background: none !important;
        border: none !important;
        padding: 0 !important;
        margin: 0 !important;
    }

    /* Modern Icons */
    .ui-btn img {
        width: 64px !important;
        height: 64px !important;
        margin-bottom: 12px !important;
        filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3)) !important;
    }

    /* Fixed Bottom Navigation */
/* Ensure navbar stays at the bottom */
.bottom-nav {
    position: fixed !important;
    bottom: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 60px !important;
    background: rgba(20, 20, 20, 0.95) !important;
    backdrop-filter: blur(8px) !important;
    display: flex !important;
    justify-content: space-around !important;
    align-items: center !important;
    z-index: 10000 !important;  /* Ensure it's on top */
    border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
}

/* Ensure navbar items are centered */
.bottom-nav a {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    text-decoration: none !important;
    color: rgba(255, 255, 255, 0.7) !important;
    font-size: 14px !important;
    font-weight: 500 !important;
    padding: 8px 0 !important;
    flex: 1 !important;
    text-align: center !important;
}

/* Ensure navbar icons and text are properly spaced */
.bottom-nav a i,
.bottom-nav a img {
    font-size: 18px !important;
    margin-bottom: 4px !important;
}

/* Ensure navbar does not overlap content */
body {
    padding-bottom: 70px !important;  /* Give space for navbar */
}

/* Fix any extra overlapping navbar issue */
.bottom-nav-duplicate {
    display: none !important; /* Hide any duplicate navbar */
}


    /* Modern Button Labels */
    .ui-btn {
        color: #fff !important;
        font-size: 1rem !important;
        font-weight: 500 !important;
        letter-spacing: 0.5px !important;
    }

    /* Offer Counter */
    #spoffercnt {
        background: #ff4757 !important;
        font-size: 0.8rem !important;
        padding: 2px 8px !important;
        position: absolute !important;
        top: 0px !important;
        right: 0px !important;
    }
`;

// Create and append style element
const style = document.createElement('style');
style.textContent = modernCSS;
document.head.appendChild(style);

// Replace images with Material Design icons
const iconMapping = {
    'Food Courts': 'restaurant',
    'Offers': 'local_offer',
    'Restaurants': 'storefront',
    'Order Status': 'pending_actions',
    'Add Cash': 'account_balance_wallet',
    'Feedback': 'feedback',
    'Reports': 'analytics',
    'My Profile': 'person'
};

/*document.querySelectorAll('[data-role="button"]').forEach(button => {
    const text = button.textContent.trim();
    const iconName = iconMapping[text] || 'help';
    button.innerHTML = `
        <span class="material-icons" style="font-size: 3rem; margin-bottom: 0.5rem;">
            ${iconName}
        </span>
        <div>${text}</div>
    `;
});*/
document.querySelectorAll('[data-role="button"] img')[0].style.borderRadius = '100%' 
// Add Material Icons font
const materialIcons = document.createElement('link');
materialIcons.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
materialIcons.rel = 'stylesheet';
document.head.appendChild(materialIcons);

// Modernize the balance display
const balanceContainer = document.getElementById('dvorderdetails');
balanceContainer.innerHTML = `
    <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span class="material-icons" style="color: #ff6a00;">account_balance_wallet</span>
        <div>
            <div id="havilableamount" style="font-size: 1.4rem; font-weight: 700;">0</div>
        </div>
    </div>
`;

// Add subtle animations
document.body.style.opacity = '0';
setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
}, 100);
    $.ajax({
                type: "GET",
                url: "/api/Student/GetRequestdetails",
                data: { Mode: "AvailableAmountbyId", MasterId: "", ActionId1: "", ActionId2: "", ActionId3: $("#ContentPlaceHolder1_hdnlocationid").val(), ActionId4: "", UserId: $("#ContentPlaceHolder1_hdnstudentid").val() },
                async: false,
                dataType: "json",
                success: function (data) {

                    if (data.Table.length > 0) {
                        datalength = data.Table.length;
                        $.each(data.Table, function (key, value) {

                            $('#havilableamount').text(value.AvailableCreditamount);
                        });
                    }

                    var offercount = 0;
                    if (data.Table1.length > 0) {
                        datalength = data.Table1.length;
                        $.each(data.Table1, function (key, value) {

                            $('#ollistview').append('<li data-icon="plus"><a href="OfferOrders.aspx"><img src="' + value.ImagePath + '"  style="padding:10px;" /><p><strong>Hotel Name: ' + value.HotelName + '</strong></p><h2 id=hitem' + value.ItemId + '>' + value.ItemName + '</h2><p><strong>' + value.ItemCategory + '</strong></p><p><strong>Unit: ' + value.Unit + '</strong></p><p><strong>Unit Price: ' + value.UnitPrice + '</strong></p><p id=hprice' + value.ItemId + ' style="display:none;">' + value.UnitPrice + '</p></a> </li>');

                            offercount++;
                        });
                    }

                    $('#spoffercnt').text(offercount);

                    if (offercount > 0) {
                        //$("#popupdetails").popup("open");
                    }

                }
            });



                        /////
})();
}
