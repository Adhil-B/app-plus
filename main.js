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
  width: 40vw;
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
        top: -8px !important;
        right: -8px !important;
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

document.querySelectorAll('[data-role="button"]').forEach(button => {
    const text = button.textContent.trim();
    const iconName = iconMapping[text] || 'help';
    button.innerHTML = `
        <span class="material-icons" style="font-size: 3rem; margin-bottom: 0.5rem;">
            ${iconName}
        </span>
        <div>${text}</div>
    `;
});

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
})();
}
