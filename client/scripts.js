let localServerIp = "http://127.0.0.1:8000/" //Set local symfony server address

//table sorting
function sortTable(n) {
    let table, rows, x, y, temp;
    table = document.getElementById("tableId");
    rows = table.rows;

    //desc bubble sorting
    if ($(rows[0].getElementsByTagName("TH")[n]).hasClass("asc")) {
        for (i = 1; i < (rows.length); i++) {
            for (j = 1; j < (rows.length); j++) {
                x = rows[i].getElementsByTagName("TD")[n];
                y = rows[j].getElementsByTagName("TD")[n];
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    temp = x.parentNode.innerHTML;
                    x.parentNode.innerHTML = y.parentNode.innerHTML;
                    y.parentNode.innerHTML = temp;
                } else {
                }
            }
        }
        $(rows[0].getElementsByTagName("TH")[n]).removeClass("asc")
    } else {
        //asc bubble sorting
        for (i = 1; i < (rows.length); i++) {
            for (j = 1; j < (rows.length); j++) {
                x = rows[i].getElementsByTagName("TD")[n];
                y = rows[j].getElementsByTagName("TD")[n];
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    temp = x.parentNode.innerHTML;
                    x.parentNode.innerHTML = y.parentNode.innerHTML;
                    y.parentNode.innerHTML = temp;
                } else {
                }
            }
        }
        $(rows[0].getElementsByTagName("TH")[n]).addClass("asc");
    }
}

//complete table
function completeTable(data) {
    let tr;
    //for each country
    $.each(data, function (key, value) {
        let languages = "";
        //if language data exist
        if (!value.Languages.hasOwnProperty('tLanguage')) {
            languages = 'no data';
        } else {
            //if country has more then one language / array of languages
            if ($.isArray(value.Languages.tLanguage)) {
                $.each(value.Languages.tLanguage, function (key2, value2) {
                    languages += value2.sISOCode + " ";
                })
            } else {
                languages = value.Languages.tLanguage.sISOCode;
            }
        }
        //create and prepend rows
        tr = '<tr>' + '<td>' + value.sISOCode + '</td>' + '<td>' + value.sName + '</td>' + '<td>' + value.sCapitalCity + '</td>' + '<td>' + value.sContinentCode + '</td>' + '<td>' + value.sCurrencyISOCode + '</td>' + '<td>' + languages + '</td>' + '<td>' + '<img src="' + value.sCountryFlag + '" alt="asd" height="70" width="130">' + '</>' + '</td>' + '</tr>';
        $('#tbodyId').prepend(tr);
    });
}

$(document).ready(function () {
    //Get all countries on page load
    $.ajax(localServerIp + "get/countries", {
        data: JSON.stringify({"method": "getAllCountries"}),
        contentType: 'application/json',
        type: 'POST',
    }).done(function (data) {
        completeTable(data);
    }).fail(function () {
        alert("Server connection error, start the server or change localServerIp variable")
    });

    //search bar
    $("#searchBarId").on("keyup", function () {
        let value = $(this).val().toLowerCase();
        $("#tableId tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});
